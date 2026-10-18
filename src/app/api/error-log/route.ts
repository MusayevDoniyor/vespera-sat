import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;

    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter"); // "due" | "all"

    const whereClauses: string[] = ["1=1"];
    const params: any[] = [];

    if (userId) {
      params.push(userId);
      whereClauses.push(`e.user_id = $${params.length}`);
    }

    if (filter === "due") {
      whereClauses.push(`e.next_review_at <= NOW() AND e.is_resolved = FALSE`);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const query = `
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
      ${whereSql}
      ORDER BY e.next_review_at ASC;
    `;

    const summaryWhere = userId ? `WHERE user_id = $1` : "";
    const summaryParams = userId ? [userId] : [];

    const summaryQuery = `
      SELECT 
        COUNT(*)::int as total_errors,
        COUNT(CASE WHEN next_review_at <= NOW() AND is_resolved = FALSE THEN 1 END)::int as due_count,
        COUNT(CASE WHEN stage = 'STAGE_1_DAY' THEN 1 END)::int as stage_1_count,
        COUNT(CASE WHEN stage = 'STAGE_3_DAYS' THEN 1 END)::int as stage_3_count,
        COUNT(CASE WHEN stage = 'STAGE_7_DAYS' THEN 1 END)::int as stage_7_count,
        COUNT(CASE WHEN is_resolved = TRUE THEN 1 END)::int as mastered_count
      FROM vespera.error_logs
      ${summaryWhere};
    `;

    // Run both list and summary queries concurrently
    const [listRes, summaryRes] = await Promise.all([
      pool.query(query, params),
      pool.query(summaryQuery, summaryParams),
    ]);

    return NextResponse.json(
      {
        errors: listRes.rows,
        summary: summaryRes.rows[0],
      },
      {
        headers: {
          "Cache-Control": "private, max-age=10, stale-while-revalidate=30",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching error logs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
