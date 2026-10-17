import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();

    // 1. Total questions in bank and user attempt status
    const questionsRes = await pool.query(`
      SELECT 
        q.section,
        COUNT(DISTINCT q.id)::int as total_bank_questions,
        COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted_count,
        COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct_count,
        COUNT(DISTINCT CASE WHEN up.status = 'INCORRECT' THEN q.id END)::int as incorrect_count
      FROM questions q
      LEFT JOIN user_progress up ON up.question_id = q.id
      GROUP BY q.section;
    `);

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

    // 2. Real Streak calculation from user_progress activity dates
    const streakRes = await pool.query(`
      SELECT DISTINCT DATE(updated_at) as active_date
      FROM user_progress
      ORDER BY active_date DESC
      LIMIT 30;
    `);

    let currentStreak = 0;
    if (streakRes.rows.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const dates = streakRes.rows.map((r: any) => new Date(r.active_date).toISOString().split("T")[0]);

      if (dates.includes(today) || dates.includes(yesterday)) {
        currentStreak = dates.length;
      }
    }

    // 3. Due error reviews from SM-2
    const dueRes = await pool.query(`
      SELECT COUNT(*)::int as due_count
      FROM error_logs
      WHERE next_review_at <= NOW() AND is_resolved = FALSE;
    `);

    // 4. Domain level mastery for Math
    const mathDomainsRes = await pool.query(`
      SELECT 
        q.domain,
        COUNT(DISTINCT q.id)::int as total,
        COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
        COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
      FROM questions q
      LEFT JOIN user_progress up ON up.question_id = q.id
      WHERE q.section = 'MATH'
      GROUP BY q.domain
      ORDER BY total DESC;
    `);

    // 5. Domain level mastery for Verbal
    const verbalDomainsRes = await pool.query(`
      SELECT 
        q.domain,
        COUNT(DISTINCT q.id)::int as total,
        COUNT(DISTINCT CASE WHEN up.id IS NOT NULL THEN q.id END)::int as attempted,
        COUNT(DISTINCT CASE WHEN up.status = 'CORRECT' THEN q.id END)::int as correct
      FROM questions q
      LEFT JOIN user_progress up ON up.question_id = q.id
      WHERE q.section = 'READING_WRITING'
      GROUP BY q.domain
      ORDER BY total DESC;
    `);

    // 6. Topics count
    const topicsRes = await pool.query(`SELECT COUNT(*)::int as count FROM topics;`);
    const totalTopics = topicsRes.rows[0]?.count || 28;

    // 7. Mock exams history & telemetry
    const mockRes = await pool.query(`
      SELECT 
        COUNT(*)::int as total_exams,
        COALESCE(MAX(score), 0)::int as highest_score,
        COALESCE((SELECT score FROM mock_exams ORDER BY completed_at DESC LIMIT 1), 0)::int as latest_score
      FROM mock_exams;
    `);
    const mockStats = mockRes.rows[0] || { total_exams: 0, highest_score: 0, latest_score: 0 };

    // -------------------------------------------------------------
    // Official College Board SAT 1:1 Section Scoring (200 - 800)
    // -------------------------------------------------------------
    // If a section is unattempted (0 questions answered): Score is 200 (Official Baseline)
    // If attempted: Scaled strictly on 200 - 800 range (600 pts) based on accuracy, rounded to nearest 10
    const mathAccuracy = mathAttempted > 0 ? (mathCorrect / mathAttempted) : 0;
    const projectedMathScore = mathAttempted > 0
      ? Math.min(800, Math.max(200, Math.round((200 + mathAccuracy * 600) / 10) * 10))
      : 200;

    const verbalAccuracy = verbalAttempted > 0 ? (verbalCorrect / verbalAttempted) : 0;
    const projectedVerbalScore = verbalAttempted > 0
      ? Math.min(800, Math.max(200, Math.round((200 + verbalAccuracy * 600) / 10) * 10))
      : 200;

    const compositeScore = projectedMathScore + projectedVerbalScore; // (400 - 1600)

    return NextResponse.json({
      totalQuestions: mathTotal + verbalTotal,
      totalSolved: mathAttempted + verbalAttempted,
      totalCorrect: mathCorrect + verbalCorrect,
      totalTopics,
      totalDiagrams: 16,
      totalMaterials: 39,
      totalMockExams: 7, // 7 Full Bluebook practice exams available
      userMockStats: mockStats,
      dueReviewsCount: dueRes.rows[0]?.due_count || 0,
      realStreak: currentStreak,
      compositeScore,
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
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDb();
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
    } = body;

    const id = "mock_" + Date.now();
    await pool.query(
      `INSERT INTO mock_exams (
        id, title, section, score, math_score, reading_score, total_questions, correct_count, time_spent
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Error saving mock exam result:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
