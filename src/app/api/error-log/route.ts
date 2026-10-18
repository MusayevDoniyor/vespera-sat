import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter"); // "due" | "all"

    let query = `
      SELECT 
        e.*,
        q.prompt,
        q.passage,
        q.options,
        q.correct_answer,
        q.explanation_uz,
        q.explanation_en,
        q.desmos_trick,
        q.section,
        q.domain,
        q.difficulty,
        t.title_uz as topic_title_uz,
        t.title_en as topic_title_en
      FROM vespera.error_logs e
      JOIN vespera.questions q ON q.id = e.question_id
      JOIN vespera.topics t ON t.code = q.topic_code
    `;

    if (filter === "due") {
      query += ` WHERE e.next_review_at <= NOW() AND e.is_resolved = FALSE`;
    }

    query += ` ORDER BY e.next_review_at ASC;`;

    const { rows } = await pool.query(query);

    // Summary counts
    const summaryRes = await pool.query(`
      SELECT 
        COUNT(*)::int as total_errors,
        COUNT(CASE WHEN next_review_at <= NOW() AND is_resolved = FALSE THEN 1 END)::int as due_count,
        COUNT(CASE WHEN stage = 'STAGE_1_DAY' THEN 1 END)::int as stage_1_count,
        COUNT(CASE WHEN stage = 'STAGE_3_DAYS' THEN 1 END)::int as stage_3_count,
        COUNT(CASE WHEN stage = 'STAGE_7_DAYS' THEN 1 END)::int as stage_7_count,
        COUNT(CASE WHEN is_resolved = TRUE THEN 1 END)::int as mastered_count
      FROM vespera.error_logs;
    `);

    return NextResponse.json({
      errors: rows,
      summary: summaryRes.rows[0],
    });
  } catch (error: any) {
    console.error("Error fetching error logs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
