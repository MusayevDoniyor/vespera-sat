import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser, getFullUserProfile } from "@/lib/auth";
import {
  calculateAdaptiveScore,
  buildPersonalizedMissions,
  DOMAIN_TO_UNIT_MAP
} from "@/lib/adaptive-engine";

export async function GET() {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;
    const profile = userId ? await getFullUserProfile(userId) : null;

    // 1. Get attempted counts & accuracy by section
    const sectionStatsRes = userId
      ? await pool.query(
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
      : await pool.query(`
          SELECT 
            q.section,
            COUNT(DISTINCT q.id)::int as total,
            COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
            COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
          FROM vespera.questions q
          LEFT JOIN vespera.user_progress up ON up.question_id = q.id
          GROUP BY q.section;
        `);

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

    // 2. Mock exam highest score
    const mockRes = userId
      ? await pool.query(
          `SELECT COALESCE(MAX(score), 0)::int as highest FROM vespera.mock_exams WHERE user_id = $1`,
          [userId]
        )
      : await pool.query(`SELECT COALESCE(MAX(score), 0)::int as highest FROM vespera.mock_exams`);
    const mockHighest = mockRes.rows[0]?.highest || 0;

    // 3. Spaced Repetition Due Reviews
    const dueRes = userId
      ? await pool.query(
          `SELECT COUNT(*)::int as due_count FROM vespera.error_logs WHERE user_id = $1 AND next_review_at <= NOW() AND is_resolved = FALSE`,
          [userId]
        )
      : await pool.query(
          `SELECT COUNT(*)::int as due_count FROM vespera.error_logs WHERE next_review_at <= NOW() AND is_resolved = FALSE`
        );
    const dueReviewsCount = dueRes.rows[0]?.due_count || 0;

    // 4. Questions solved today
    const todayRes = userId
      ? await pool.query(
          `SELECT COUNT(*)::int as today_count FROM vespera.user_progress WHERE user_id = $1 AND DATE(updated_at) = CURRENT_DATE`,
          [userId]
        )
      : await pool.query(
          `SELECT COUNT(*)::int as today_count FROM vespera.user_progress WHERE DATE(updated_at) = CURRENT_DATE`
        );
    const todaySolved = todayRes.rows[0]?.today_count || 0;

    // 5. Domain Mastery & Weakness Analysis
    const domainStatsRes = userId
      ? await pool.query(
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
      : await pool.query(`
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
        `);

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

    // Detect primary weakness: lowest accuracy among attempted, or highest-yield unattempted
    const attemptedDomains = domainMasteryList.filter((d: any) => d.attempted > 0);
    let weakestDomain = "Algebra";
    if (attemptedDomains.length > 0) {
      attemptedDomains.sort((a: any, b: any) => a.accuracy - b.accuracy);
      weakestDomain = attemptedDomains[0].domain;
    }

    // 6. Calculate Bayesian Adaptive Score Prediction
    const scorePrediction = calculateAdaptiveScore({
      mathAttempted,
      mathCorrect,
      verbalAttempted,
      verbalCorrect,
      mathLevel: profile?.mathLevel || "intermediate",
      englishLevel: profile?.englishLevel || "intermediate",
      currentSatScore: profile?.currentSatScore || null,
      targetSatScore: profile?.targetSatScore || 1550,
      mockHighestScore: mockHighest
    });

    // 7. Generate 3 Personalized Daily Missions
    const hasTakenDiagnostic = (mathAttempted + verbalAttempted) >= 8 || Boolean(profile?.currentSatScore);
    const dailyMissions = buildPersonalizedMissions({
      userTargetScore: profile?.targetSatScore || 1550,
      dueReviewsCount,
      weakestDomain,
      hasTakenDiagnostic,
      todayQuestionsSolved: todaySolved
    });

    // 8. Fetch Top 8 Recommended Questions tailored to weakness
    const targetDifficulty = scorePrediction.composite >= 1350 ? "Hard" : "Medium";
    const recommendedQuestionsRes = await pool.query(
      `
      SELECT 
        q.id,
        q.section,
        q.domain,
        q.difficulty,
        q.prompt,
        q.options,
        q.correct_answer,
        q.explanation_en,
        t.title_en as topic_title
      FROM vespera.questions q
      JOIN vespera.topics t ON t.code = q.topic_code
      WHERE q.domain = $1 OR q.difficulty = $2
      ORDER BY RANDOM()
      LIMIT 8;
    `,
      [weakestDomain, targetDifficulty]
    );

    return NextResponse.json({
      scorePrediction,
      weakestDomain,
      domainMastery: domainMasteryList,
      dailyMissions,
      recommendedQuestions: recommendedQuestionsRes.rows,
      dueReviewsCount,
      todaySolved
    });
  } catch (error: any) {
    console.error("Error in recommendations API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
