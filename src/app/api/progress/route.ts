import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;

    const body = await request.json();
    const { questionId, userChoice, timeSpent, mistakeType, qualityRating } = body;

    if (!questionId || !userChoice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch question details
    const qRes = await pool.query("SELECT correct_answer FROM questions WHERE id = $1;", [questionId]);
    if (qRes.rows.length === 0) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    const correctAnswer = qRes.rows[0].correct_answer.trim().toUpperCase();
    const chosenLetter = userChoice.trim().toUpperCase();
    const isCorrect = chosenLetter === correctAnswer;
    const status = isCorrect ? "CORRECT" : "INCORRECT";

    // 2. Upsert user progress (partitioned by userId if logged in)
    const progressId = userId ? `up_${userId}_${questionId}` : `up_${questionId}`;
    await pool.query(
      `INSERT INTO user_progress (id, question_id, user_id, status, user_choice, time_spent, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (id) DO UPDATE SET
         status = EXCLUDED.status,
         user_choice = EXCLUDED.user_choice,
         time_spent = user_progress.time_spent + EXCLUDED.time_spent,
         updated_at = NOW();`,
      [progressId, questionId, userId, status, chosenLetter, timeSpent || 30]
    );

    // 3. SM-2 Spaced Repetition Algorithm Implementation
    const errLogId = userId ? `err_${userId}_${questionId}` : `err_${questionId}`;
    const existingLogRes = await pool.query(
      "SELECT ease_factor, repetitions, interval_days, retention_score FROM error_logs WHERE id = $1;",
      [errLogId]
    );

    let ef = 2.5;
    let repetitions = 0;
    let intervalDays = 1;

    if (existingLogRes.rows.length > 0) {
      ef = existingLogRes.rows[0].ease_factor ?? 2.5;
      repetitions = existingLogRes.rows[0].repetitions ?? 0;
      intervalDays = existingLogRes.rows[0].interval_days ?? 1;
    }

    // Quality: 0-5
    // Incorrect -> q = 1 (or 2)
    // Correct with rating: 3 (Hard), 4 (Good), 5 (Easy/Desmos)
    const q = isCorrect ? (qualityRating ? Math.min(5, Math.max(3, qualityRating)) : 4) : 1;

    // SM-2 Ease Factor calculation
    ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (ef < 1.3) ef = 1.3;

    let stage = "STAGE_1_DAY";
    if (q < 3) {
      repetitions = 0;
      intervalDays = 1;
      stage = "STAGE_1_DAY";
    } else {
      if (repetitions === 0) {
        intervalDays = 1;
        stage = "STAGE_1_DAY";
      } else if (repetitions === 1) {
        intervalDays = 3;
        stage = "STAGE_3_DAYS";
      } else {
        intervalDays = Math.round(intervalDays * ef);
        stage = intervalDays >= 7 ? "STAGE_7_DAYS" : "STAGE_3_DAYS";
      }
      repetitions += 1;
    }

    const isMastered = repetitions >= 3 && intervalDays >= 7;
    if (isMastered) stage = "MASTERED";

    const nextReviewAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000);

    // If it's incorrect OR already tracked, update error_logs
    if (!isCorrect || existingLogRes.rows.length > 0) {
      await pool.query(
        `INSERT INTO error_logs (id, question_id, user_id, mistake_type, stage, next_review_at, is_resolved, ease_factor, repetitions, interval_days, last_quality, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
         ON CONFLICT (id) DO UPDATE SET
           mistake_type = COALESCE(EXCLUDED.mistake_type, error_logs.mistake_type),
           stage = EXCLUDED.stage,
           next_review_at = EXCLUDED.next_review_at,
           is_resolved = EXCLUDED.is_resolved,
           ease_factor = EXCLUDED.ease_factor,
           repetitions = EXCLUDED.repetitions,
           interval_days = EXCLUDED.interval_days,
           last_quality = EXCLUDED.last_quality;`,
        [
          errLogId,
          questionId,
          userId,
          mistakeType || (isCorrect ? "MASTERED" : "CONCEPT_GAP"),
          stage,
          nextReviewAt,
          isMastered,
          ef,
          repetitions,
          intervalDays,
          q,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      isCorrect,
      correctAnswer,
      status,
      sm2: {
        stage,
        intervalDays,
        repetitions,
        easeFactor: Math.round(ef * 100) / 100,
        nextReviewAt,
        isMastered,
      },
    });
  } catch (error: any) {
    console.error("Error saving progress:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
