import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser, getFullUserProfile } from "@/lib/auth";
import { SATASHKENT_LIBRARY } from "@/lib/satashkent-data";
import { BLUEBOOK_EXAMS } from "@/lib/bluebook-tests";

// Micro-cache (15-second TTL) to deduplicate simultaneous calls from Sidebar and Dashboard
interface CachedStats {
  data: any;
  timestamp: number;
}
const statsCache = new Map<string, CachedStats>();
const STATS_CACHE_TTL_MS = 15000;

export async function GET() {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;
    const cacheKey = userId || "guest";

    const cached = statsCache.get(cacheKey);
    const now = Date.now();
    if (cached && now - cached.timestamp < STATS_CACHE_TTL_MS) {
      return NextResponse.json(cached.data, {
        headers: { "X-Vespera-Cache": "HIT" },
      });
    }

    // Run all 11 database queries in parallel concurrently
    const [
      questionsRes,
      streakRes,
      dueRes,
      mathDomainsRes,
      verbalDomainsRes,
      topicsRes,
      mockRes,
      mockHistoryRes,
      paceRes,
      difficultyRes,
      recentActivityRes,
    ] = await Promise.all([
      // 1. Total questions in bank and user attempt status
      userId
        ? pool.query(
            `
            SELECT 
              q.section,
              COUNT(DISTINCT q.id)::int as total_bank_questions,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted_count,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct_count,
              COUNT(DISTINCT CASE WHEN up.status = 'INCORRECT' THEN q.id END)::int as incorrect_count
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id = $1
            GROUP BY q.section;
          `,
            [userId]
          )
        : pool.query(`
            SELECT 
              q.section,
              COUNT(DISTINCT q.id)::int as total_bank_questions,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted_count,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct_count,
              COUNT(DISTINCT CASE WHEN up.status = 'INCORRECT' THEN q.id END)::int as incorrect_count
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id
            GROUP BY q.section;
          `),

      // 2. Real Streak calculation from user_progress activity dates
      userId
        ? pool.query(
            `
            SELECT DISTINCT DATE(updated_at) as active_date
            FROM vespera.user_progress
            WHERE user_id = $1
            ORDER BY active_date DESC
            LIMIT 30;
          `,
            [userId]
          )
        : pool.query(`
            SELECT DISTINCT DATE(updated_at) as active_date
            FROM vespera.user_progress
            ORDER BY active_date DESC
            LIMIT 30;
          `),

      // 3. Due error reviews from SM-2
      userId
        ? pool.query(
            `
            SELECT COUNT(*)::int as due_count
            FROM vespera.error_logs
            WHERE user_id = $1 AND next_review_at <= NOW() AND is_resolved = FALSE;
          `,
            [userId]
          )
        : pool.query(`
            SELECT COUNT(*)::int as due_count
            FROM vespera.error_logs
            WHERE next_review_at <= NOW() AND is_resolved = FALSE;
          `),

      // 4. Domain level mastery for Math
      userId
        ? pool.query(
            `
            SELECT 
              q.domain,
              COUNT(DISTINCT q.id)::int as total,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id = $1
            WHERE q.section = 'MATH'
            GROUP BY q.domain
            ORDER BY total DESC;
          `,
            [userId]
          )
        : pool.query(`
            SELECT 
              q.domain,
              COUNT(DISTINCT q.id)::int as total,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id
            WHERE q.section = 'MATH'
            GROUP BY q.domain
            ORDER BY total DESC;
          `),

      // 5. Domain level mastery for Verbal
      userId
        ? pool.query(
            `
            SELECT 
              q.domain,
              COUNT(DISTINCT q.id)::int as total,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id = $1
            WHERE q.section = 'READING_WRITING'
            GROUP BY q.domain
            ORDER BY total DESC;
          `,
            [userId]
          )
        : pool.query(`
            SELECT 
              q.domain,
              COUNT(DISTINCT q.id)::int as total,
              COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
              COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
            FROM vespera.questions q
            LEFT JOIN vespera.user_progress up ON up.question_id = q.id
            WHERE q.section = 'READING_WRITING'
            GROUP BY q.domain
            ORDER BY total DESC;
          `),

      // 6. Topics count
      pool.query(`SELECT COUNT(*)::int as count FROM vespera.topics;`),

      // 7. Mock exams history & telemetry
      userId
        ? pool.query(
            `
            SELECT 
              COUNT(*)::int as total_exams,
              COALESCE(MAX(score), 0)::int as highest_score,
              COALESCE((SELECT score FROM vespera.mock_exams WHERE user_id = $1 ORDER BY completed_at DESC LIMIT 1), 0)::int as latest_score
            FROM vespera.mock_exams
            WHERE user_id = $1;
          `,
            [userId]
          )
        : pool.query(`
            SELECT 
              COUNT(*)::int as total_exams,
              COALESCE(MAX(score), 0)::int as highest_score,
              COALESCE((SELECT score FROM vespera.mock_exams ORDER BY completed_at DESC LIMIT 1), 0)::int as latest_score
            FROM vespera.mock_exams;
          `),

      // 8. Mock history
      userId
        ? pool.query(
            `SELECT id, title, section, score, math_score, reading_score, total_questions, correct_count, time_spent, completed_at, domain_stats
             FROM vespera.mock_exams
             WHERE user_id = $1 OR user_id IS NULL
             ORDER BY completed_at DESC LIMIT 10;`,
            [userId]
          )
        : pool.query(
            `SELECT id, title, section, score, math_score, reading_score, total_questions, correct_count, time_spent, completed_at, domain_stats
             FROM vespera.mock_exams
             ORDER BY completed_at DESC LIMIT 10;`
          ),

      // 9. Pace telemetry (average seconds per question)
      userId
        ? pool.query(
            `SELECT q.section, ROUND(AVG(NULLIF(up.time_spent, 0)))::int as avg_time, COUNT(*)::int as attempts
             FROM vespera.user_progress up
             JOIN vespera.questions q ON q.id = up.question_id
             WHERE up.user_id = $1 AND up.time_spent > 0 AND up.time_spent < 600
             GROUP BY q.section;`,
            [userId]
          )
        : pool.query(
            `SELECT q.section, ROUND(AVG(NULLIF(up.time_spent, 0)))::int as avg_time, COUNT(*)::int as attempts
             FROM vespera.user_progress up
             JOIN vespera.questions q ON q.id = up.question_id
             WHERE up.time_spent > 0 AND up.time_spent < 600
             GROUP BY q.section;`
          ),

      // 10. Difficulty Breakdown
      userId
        ? pool.query(
            `SELECT 
               q.difficulty,
               COUNT(DISTINCT q.id)::int as total,
               COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
               COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
             FROM vespera.questions q
             LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id = $1
             GROUP BY q.difficulty;`,
            [userId]
          )
        : pool.query(`
            SELECT 
               q.difficulty,
               COUNT(DISTINCT q.id)::int as total,
               COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
               COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
             FROM vespera.questions q
             LEFT JOIN vespera.user_progress up ON up.question_id = q.id
             GROUP BY q.difficulty;
          `),

      // 11. Recent Solved Questions Activity
      userId
        ? pool.query(
            `SELECT 
               up.id,
               up.question_id,
               up.status,
               up.user_choice,
               up.time_spent,
               up.updated_at,
               q.prompt,
               q.section,
               q.domain,
               q.difficulty,
               q.correct_answer,
               t.title_en as topic_title
             FROM vespera.user_progress up
             JOIN vespera.questions q ON q.id = up.question_id
             LEFT JOIN vespera.topics t ON t.code = q.topic_code
             WHERE up.user_id = $1
             ORDER BY up.updated_at DESC
             LIMIT 35;`,
            [userId]
          )
        : pool.query(`
             SELECT 
               up.id,
               up.question_id,
               up.status,
               up.user_choice,
               up.time_spent,
               up.updated_at,
               q.prompt,
               q.section,
               q.domain,
               q.difficulty,
               q.correct_answer,
               t.title_en as topic_title
             FROM vespera.user_progress up
             JOIN vespera.questions q ON q.id = up.question_id
             LEFT JOIN vespera.topics t ON t.code = q.topic_code
             ORDER BY up.updated_at DESC
             LIMIT 35;
          `),
    ]);

    let mathTotal = 0, mathAttempted = 0, mathCorrect = 0, mathIncorrect = 0;
    let verbalTotal = 0, verbalAttempted = 0, verbalCorrect = 0, verbalIncorrect = 0;

    for (const row of questionsRes.rows) {
      if (row.section === "MATH") {
        mathTotal = row.total_bank_questions;
        mathAttempted = row.attempted_count;
        mathCorrect = row.correct_count;
        mathIncorrect = row.incorrect_count;
      } else {
        verbalTotal = row.total_bank_questions;
        verbalAttempted = row.attempted_count;
        verbalCorrect = row.correct_count;
        verbalIncorrect = row.incorrect_count;
      }
    }

    let currentStreak = 0;
    if (streakRes.rows.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const dates = streakRes.rows.map((r: any) => new Date(r.active_date).toISOString().split("T")[0]);

      if (dates.includes(today) || dates.includes(yesterday)) {
        currentStreak = dates.length;
      }
    }

    const totalTopics = topicsRes.rows[0]?.count || 28;
    const mockStats = mockRes.rows[0] || { total_exams: 0, highest_score: 0, latest_score: 0 };

    // -------------------------------------------------------------
    // Official College Board SAT 1:1 Section Scoring (200 - 800)
    // -------------------------------------------------------------
    const mathAccuracy = mathAttempted > 0 ? (mathCorrect / mathAttempted) : 0;
    const projectedMathScore = mathAttempted > 0
      ? Math.min(800, Math.max(200, Math.round((200 + mathAccuracy * 600) / 10) * 10))
      : 200;

    const verbalAccuracy = verbalAttempted > 0 ? (verbalCorrect / verbalAttempted) : 0;
    const projectedVerbalScore = verbalAttempted > 0
      ? Math.min(800, Math.max(200, Math.round((200 + verbalAccuracy * 600) / 10) * 10))
      : 200;

    const compositeScore = projectedMathScore + projectedVerbalScore; // (400 - 1600)

    // Official College Board Target Benchmarks & Pace Telemetry
    let mathAvgPace = 92;
    let verbalAvgPace = 68;
    let mathPaceAttempts = 0;
    let verbalPaceAttempts = 0;

    for (const row of paceRes.rows) {
      if (row.section === "MATH" && row.avg_time) {
        mathAvgPace = row.avg_time;
        mathPaceAttempts = row.attempts;
      } else if (row.section === "READING_WRITING" && row.avg_time) {
        verbalAvgPace = row.avg_time;
        verbalPaceAttempts = row.attempts;
      }
    }

    const MATH_BENCHMARK_SEC = 95; // 35 min / 22 questions
    const VERBAL_BENCHMARK_SEC = 71; // 32 min / 27 questions

    const paceStats = {
      math: {
        avgSeconds: mathAvgPace,
        targetSeconds: MATH_BENCHMARK_SEC,
        status: mathAvgPace > 115 ? "slow" : mathAvgPace < 60 ? "rushing" : "optimal",
        deltaSeconds: mathAvgPace - MATH_BENCHMARK_SEC,
        totalLogged: mathPaceAttempts,
      },
      verbal: {
        avgSeconds: verbalAvgPace,
        targetSeconds: VERBAL_BENCHMARK_SEC,
        status: verbalAvgPace > 88 ? "slow" : verbalAvgPace < 45 ? "rushing" : "optimal",
        deltaSeconds: verbalAvgPace - VERBAL_BENCHMARK_SEC,
        totalLogged: verbalPaceAttempts,
      },
    };

    // Standardized 8 Domain Mapping & Mastery calculation
    const DOMAIN_SLUG_MAP: Record<string, { slug: string; shortCode: string }> = {
      "Algebra": { slug: "unit-06-medium-algebra", shortCode: "ALG" },
      "Advanced Math": { slug: "unit-08-medium-adv-math", shortCode: "ADV" },
      "Problem Solving & Data Analysis": { slug: "unit-07-medium-psda", shortCode: "DAT" },
      "Geometry & Trigonometry": { slug: "unit-09-medium-geom-trig", shortCode: "GEO" },
      "Craft and Structure": { slug: "unit-01-about-sat", shortCode: "CAS" },
      "Information and Ideas": { slug: "unit-03-foundations-psda", shortCode: "IAI" },
      "Standard English Conventions": { slug: "unit-02-foundations-algebra", shortCode: "SEC" },
      "Expression of Ideas": { slug: "unit-02-foundations-algebra", shortCode: "EOI" },
    };

    const domainMasteryList = [
      ...mathDomainsRes.rows.map((row: any) => {
        const attempted = row.attempted || 0;
        const correct = row.correct || 0;
        const total = row.total || 0;
        const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
        const meta = DOMAIN_SLUG_MAP[row.domain] || { slug: "unit-06-medium-algebra", shortCode: "MTH" };
        const status = attempted === 0 ? "Untested" : accuracy >= 85 ? "Mastered" : accuracy >= 65 ? "Proficient" : "Needs Focus";
        const estimatedPointLoss = attempted > 0 && accuracy < 85 ? Math.round((1 - accuracy / 100) * 120) : 0;

        return {
          domain: row.domain,
          section: "MATH",
          shortCode: meta.shortCode,
          slug: meta.slug,
          total,
          attempted,
          correct,
          accuracy,
          status,
          estimatedPointLoss,
        };
      }),
      ...verbalDomainsRes.rows.map((row: any) => {
        const attempted = row.attempted || 0;
        const correct = row.correct || 0;
        const total = row.total || 0;
        const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
        const meta = DOMAIN_SLUG_MAP[row.domain] || { slug: "unit-01-about-sat", shortCode: "VRB" };
        const status = attempted === 0 ? "Untested" : accuracy >= 85 ? "Mastered" : accuracy >= 65 ? "Proficient" : "Needs Focus";
        const estimatedPointLoss = attempted > 0 && accuracy < 85 ? Math.round((1 - accuracy / 100) * 120) : 0;

        return {
          domain: row.domain,
          section: "READING_WRITING",
          shortCode: meta.shortCode,
          slug: meta.slug,
          total,
          attempted,
          correct,
          accuracy,
          status,
          estimatedPointLoss,
        };
      }),
    ];

    const diffMap: Record<string, { total: number; attempted: number; correct: number }> = {
      Easy: { total: 0, attempted: 0, correct: 0 },
      Medium: { total: 0, attempted: 0, correct: 0 },
      Hard: { total: 0, attempted: 0, correct: 0 },
    };

    for (const r of difficultyRes.rows) {
      const diff = r.difficulty || "Medium";
      if (!diffMap[diff]) {
        diffMap[diff] = { total: 0, attempted: 0, correct: 0 };
      }
      diffMap[diff].total += r.total || 0;
      diffMap[diff].attempted += r.attempted || 0;
      diffMap[diff].correct += r.correct || 0;
    }

    const difficultyBreakdown = Object.entries(diffMap).map(([difficulty, data]) => ({
      difficulty,
      total: data.total,
      attempted: data.attempted,
      correct: data.correct,
      accuracy: data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0,
    }));

    const responsePayload = {
      totalQuestions: mathTotal + verbalTotal,
      totalSolved: mathAttempted + verbalAttempted,
      totalCorrect: mathCorrect + verbalCorrect,
      totalTopics,
      totalDiagrams: 16,
      totalMaterials: SATASHKENT_LIBRARY.length,
      totalMockExams: BLUEBOOK_EXAMS.length,
      userMockStats: mockStats,
      mockHistory: mockHistoryRes.rows || [],
      dueReviewsCount: dueRes.rows[0]?.due_count || 0,
      realStreak: currentStreak,
      compositeScore,
      paceStats,
      domainMasteryList,
      difficultyBreakdown,
      recentActivity: recentActivityRes.rows || [],
      math: {
        total: mathTotal,
        attempted: mathAttempted,
        correct: mathCorrect,
        incorrect: mathIncorrect,
        accuracy: Math.round(mathAccuracy * 100),
        projectedScore: projectedMathScore,
        domains: mathDomainsRes.rows,
      },
      verbal: {
        total: verbalTotal,
        attempted: verbalAttempted,
        correct: verbalCorrect,
        incorrect: verbalIncorrect,
        accuracy: Math.round(verbalAccuracy * 100),
        projectedScore: projectedVerbalScore,
        domains: verbalDomainsRes.rows,
      },
      targetScore: 1550,
    };

    // Cache the processed stats for 15s to deduplicate simultaneous requests
    statsCache.set(cacheKey, { data: responsePayload, timestamp: Date.now() });

    return NextResponse.json(responsePayload, {
      headers: {
        "Cache-Control": "private, no-cache, no-transform",
      },
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;

    const body = await req.json();
    const {
      title,
      section,
      score,
      mathScore,
      readingScore,
      totalQuestions,
      correctCount,
      timeSpent,
      domainStats,
    } = body;

    const id = "mock_" + Date.now();
    await pool.query(
      `INSERT INTO vespera.mock_exams (
        id, title, section, score, math_score, reading_score, total_questions, correct_count, time_spent, user_id, domain_stats
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        id,
        title || "Bluebook Practice Exam",
        section || "FULL",
        score || 400,
        mathScore || 200,
        readingScore || 200,
        totalQuestions || 0,
        correctCount || 0,
        timeSpent || 0,
        userId,
        domainStats ? JSON.stringify(domainStats) : null,
      ]
    );

    // Invalidate stats cache so fresh data is immediately available
    statsCache.clear();

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Error saving mock exam result:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
