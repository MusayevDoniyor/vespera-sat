import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    let query = `
      SELECT 
        t.*,
        COUNT(q.id)::int as question_count,
        COUNT(CASE WHEN up.status = 'CORRECT' THEN 1 END)::int as mastered_count
      FROM topics t
      LEFT JOIN questions q ON q.topic_code = t.code
      LEFT JOIN user_progress up ON up.question_id = q.id
    `;
    const params: any[] = [];

    if (section) {
      query += ` WHERE t.section = $1`;
      params.push(section);
    }

    query += ` GROUP BY t.id ORDER BY t.sort_order ASC;`;

    const { rows } = await pool.query(query, params);
    return NextResponse.json({ topics: rows });
  } catch (error: any) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
