import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser, getFullUserProfile } from "@/lib/auth";
import {
  calculateAdaptiveScore,
  buildPersonalizedMissions,
  DOMAIN_TO_UNIT_MAP
} from "@/lib/adaptive-engine";
import { isMathDomain, isVerbalDomain } from "@/lib/curriculum-data";

// Micro-cache (15-second TTL) for recommendations
interface CachedRecs {
  data: any;
  timestamp: number;
}
const recsCache = new Map<string, CachedRecs>();
const RECS_CACHE_TTL_MS = 15000;

export async function GET() {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;
    const cacheKey = userId || "guest";

    const cached = recsCache.get(cacheKey);
    const now = Date.now();
    if (cached && now - cached.timestamp < RECS_CACHE_TTL_MS) {
      return NextResponse.json(cached.data, {
        headers: { "X-Vespera-Cache": "HIT" },
      });
    }

    const profile = userId ? await getFullUserProfile(userId) : null;

    // Run the 5 telemetry and stats queries in parallel
    const [
      sectionStatsRes,
      mockRes,
      dueRes,
      todayRes,
      domainStatsRes,
    ] = await Promise.all([
      // 1. Get attempted counts & accuracy by section from individual practice
      userId
        ? pool.query(
            `
            SELECT 
              q.section,
              COUNT(DISTINCT q.id)::int as total,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id = $1
            GROUP BY q.section;
          `,
            [userId]
          )
        : pool.query(`
            SELECT 
              q.section,
              COUNT(DISTINCT q.id)::int as total,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id
            GROUP BY q.section;
          `),

      // 2. Fetch Latest Mock Exam attempt (and domain telemetry)
      userId
        ? pool.query(
            `SELECT id, title, score, math_score, reading_score, total_questions, correct_count, domain_stats, completed_at
           FROM vespera.mock_exams
           WHERE user_id = $1 OR user_id IS NULL
           ORDER BY completed_at DESC LIMIT 1`,
            [userId]
          )
        : pool.query(
            `SELECT id, title, score, math_score, reading_score, total_questions, correct_count, domain_stats, completed_at
           FROM vespera.mock_exams
           ORDER BY completed_at DESC LIMIT 1`
          ),

      // 3. Spaced Repetition Due Reviews
      userId
        ? pool.query(
            `SELECT COUNT(*)::int as due_count FROM vespera.error_logs WHERE user_id = $1 AND next_review_at <= NOW() AND is_resolved = FALSE`,
            [userId]
          )
        : pool.query(
            `SELECT COUNT(*)::int as due_count FROM vespera.error_logs WHERE next_review_at <= NOW() AND is_resolved = FALSE`
          ),

      // 4. Questions solved today
      userId
        ? pool.query(
            `SELECT COUNT(*)::int as today_count FROM vespera.user_progress WHERE user_id = $1 AND DATE(updated_at) = CURRENT_DATE`,
            [userId]
          )
        : pool.query(
            `SELECT COUNT(*)::int as today_count FROM vespera.user_progress WHERE DATE(updated_at) = CURRENT_DATE`
          ),

      // 5. Domain Mastery & Weakness Analysis
      userId
        ? pool.query(
            `
            SELECT 
              q.section,
              q.domain,
              COUNT(DISTINCT q.id)::int as total,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id = $1
            GROUP BY q.section, q.domain
            ORDER BY q.section, total DESC;
          `,
            [userId]
          )
        : pool.query(`
            SELECT 
              q.section,
              q.domain,
              COUNT(DISTINCT q.id)::int as total,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id
            GROUP BY q.section, q.domain
            ORDER BY q.section, total DESC;
          `),
    ]);

    let mathAttempted = 0, mathCorrect = 0;
    let verbalAttempted = 0, verbalCorrect = 0;

    for (const r of sectionStatsRes.rows) {
      if (r.section === "MATH") {
        mathAttempted = r.attempted;
        mathCorrect = r.correct;
      } else {
        verbalAttempted = r.attempted;
        verbalCorrect = r.correct;
      }
    }

    const latestMock = mockRes.rows[0] || null;
    const mockHighest = latestMock?.score || 0;
    const dueReviewsCount = dueRes.rows[0]?.due_count || 0;
    const todaySolved = todayRes.rows[0]?.today_count || 0;

    const domainMasteryList = domainStatsRes.rows.map((r: any) => {
      const accuracy = r.attempted > 0 ? Math.round((r.correct / r.attempted) * 100) : 0;
      let status: "Mastered" | "Proficient" | "Needs Focus" | "Untested" = "Untested";
      if (r.attempted >= 10 && accuracy >= 85) status = "Mastered";
      else if (r.attempted >= 5 && accuracy >= 70) status = "Proficient";
      else if (r.attempted > 0) status = "Needs Focus";

      const unitInfo = DOMAIN_TO_UNIT_MAP[r.domain] || {
        slug: "unit-06-medium-algebra",
        title: "Unit 6: Medium: Algebra"
      };

      return {
        section: r.section,
        domain: r.domain,
        total: r.total,
        attempted: r.attempted,
        correct: r.correct,
        accuracy,
        status,
        recommendedUnitSlug: unitInfo.slug,
        recommendedUnitTitle: unitInfo.title
      };
    });

    // Merge Mock Exam domain telemetry if available
    const mockDomainStats = latestMock?.domain_stats || null;
    if (mockDomainStats && typeof mockDomainStats === "object") {
      for (const d of domainMasteryList) {
        const mockD = mockDomainStats[d.domain];
        if (mockD) {
          d.attempted += (mockD.total || 0);
          d.correct += (mockD.correct || 0);
          d.accuracy = d.attempted > 0 ? Math.round((d.correct / d.attempted) * 100) : 0;
          if (d.attempted >= 10 && d.accuracy >= 85) d.status = "Mastered";
          else if (d.attempted >= 5 && d.accuracy >= 70) d.status = "Proficient";
          else if (d.attempted > 0) d.status = "Needs Focus";
        }
      }

      for (const [, stat] of Object.entries(mockDomainStats) as [string, any][]) {
        if (stat.section === "MATH") {
          mathAttempted += (stat.total || 0);
          mathCorrect += (stat.correct || 0);
        } else {
          verbalAttempted += (stat.total || 0);
          verbalCorrect += (stat.correct || 0);
        }
      }
    }

    // Detect primary weaknesses: lowest accuracy among attempted
    const attemptedDomains = domainMasteryList.filter((d: any) => d.attempted > 0);
    let weakestDomain = "Algebra";
    let weakestMathDomain = "Algebra";
    let weakestVerbalDomain = "Expression of Ideas";

    if (attemptedDomains.length > 0) {
      attemptedDomains.sort((a: any, b: any) => a.accuracy - b.accuracy);
      weakestDomain = attemptedDomains[0].domain;

      const mathWeak = attemptedDomains.find((d: any) => isMathDomain(d.domain) || d.section === "MATH");
      if (mathWeak) weakestMathDomain = mathWeak.domain;

      const verbalWeak = attemptedDomains.find((d: any) => isVerbalDomain(d.domain) || d.section === "READING_WRITING");
      if (verbalWeak) weakestVerbalDomain = verbalWeak.domain;
    }

    // Strict validation safety fallbacks
    if (!isMathDomain(weakestMathDomain)) {
      weakestMathDomain = "Algebra";
    }
    if (!isVerbalDomain(weakestVerbalDomain)) {
      weakestVerbalDomain = "Expression of Ideas";
    }

    // 6. Calculate Bayesian Adaptive Score Prediction
    const scorePrediction = calculateAdaptiveScore({
      mathAttempted,
      mathCorrect,
      verbalAttempted,
      verbalCorrect,
      mathLevel: profile?.mathLevel || "intermediate",
      englishLevel: profile?.englishLevel || "intermediate",
      currentSatScore: profile?.currentSatScore || (latestMock ? latestMock.score : null),
      targetSatScore: profile?.targetSatScore || 1550,
      mockHighestScore: mockHighest
    });

    // If mock exam score exists, lock composite to authentic exam calibration
    if (latestMock && latestMock.score >= 400) {
      scorePrediction.composite = latestMock.score;
      if (latestMock.math_score) scorePrediction.math = latestMock.math_score;
      if (latestMock.reading_score) scorePrediction.verbal = latestMock.reading_score;
      scorePrediction.confidence = "high";
    }

    // 7. Generate 3 Personalized Daily Missions
    const hasTakenDiagnostic = (mathAttempted + verbalAttempted) >= 8 || Boolean(profile?.currentSatScore) || Boolean(latestMock);
    const dailyMissions = buildPersonalizedMissions({
      userTargetScore: profile?.targetSatScore || 1550,
      dueReviewsCount,
      weakestDomain,
      hasTakenDiagnostic,
      todayQuestionsSolved: todaySolved
    });

    // Customize mission 1 if based on mock exam
    if (latestMock && dailyMissions.length > 0 && dailyMissions[0].type === "weakness") {
      const weakDomainAccuracy = attemptedDomains.find((d: any) => d.domain === weakestDomain)?.accuracy ?? 25;
      dailyMissions[0].title = `Weakness Drill: ${weakestDomain} (${weakDomainAccuracy}% in ${latestMock.title})`;
      dailyMissions[0].subtitle = `Target your lowest-scoring domain from your recent ${latestMock.score}-score practice test.`;
      const isMath = isMathDomain(weakestDomain);
      dailyMissions[0].targetUrl = isMath
        ? `/math?domain=${encodeURIComponent(weakestDomain)}&adaptive=true`
        : `/verbal?domain=${encodeURIComponent(weakestDomain)}&adaptive=true`;
    }

    // 8. Calibrate Difficulty & Fetch Top Recommended Questions tailored to weakness
    const currentScore = latestMock ? latestMock.score : scorePrediction.composite;
    let targetDifficulties: string[] = ["Medium"];
    if (currentScore < 1050) {
      targetDifficulties = ["Easy", "Medium"];
    } else if (currentScore < 1350) {
      targetDifficulties = ["Medium", "Hard"];
    } else {
      targetDifficulties = ["Hard"];
    }

    const priorityDomains = Array.from(new Set([weakestDomain, weakestMathDomain, weakestVerbalDomain]));
    const recommendedQuestionsRes = await pool.query(
      `
      SELECT 
        q.id,
        q.section,
        q.domain,
        q.difficulty,
        q.prompt,
        q.passage,
        q.options,
        q.correct_answer,
        q.explanation_uz,
        q.explanation_en,
        q.desmos_trick,
        q.reference_formula,
        t.title_en as topic_title_en,
        t.title_uz as topic_title_uz
      FROM vespera.questions q
      JOIN vespera.topics t ON t.code = q.topic_code
      WHERE q.domain = ANY($1) AND q.difficulty = ANY($2)
      ORDER BY RANDOM()
      LIMIT 8;
    `,
      [priorityDomains, targetDifficulties]
    );

    const payload = {
      scorePrediction,
      latestMock: latestMock ? {
        id: latestMock.id,
        title: latestMock.title,
        score: latestMock.score,
        mathScore: latestMock.math_score,
        readingScore: latestMock.reading_score,
        correctCount: latestMock.correct_count,
        totalQuestions: latestMock.total_questions,
        completedAt: latestMock.completed_at,
        domainStats: latestMock.domain_stats
      } : null,
      weakestDomain,
      weakestMathDomain,
      weakestVerbalDomain,
      domainMastery: domainMasteryList,
      dailyMissions,
      recommendedQuestions: recommendedQuestionsRes.rows,
      targetDifficulties,
      dueReviewsCount,
      todaySolved
    };

    recsCache.set(cacheKey, { data: payload, timestamp: Date.now() });

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "private, no-cache, no-transform",
      },
    });
  } catch (error: any) {
    console.error("Error in recommendations API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
