import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const domain = searchParams.get("domain");
    const topicCode = searchParams.get("topicCode");
    const difficulty = searchParams.get("difficulty");
    const random = searchParams.get("random") === "true";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 200;

    let query = `
      SELECT 
        q.*,
        t.title_uz as topic_title_uz,
        t.title_en as topic_title_en,
        t.desmos_tips as topic_desmos_tips,
        up.status as progress_status,
        up.user_choice,
        up.time_spent
      FROM questions q
      JOIN topics t ON t.code = q.topic_code
      LEFT JOIN user_progress up ON up.question_id = q.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (section && section !== "ALL") {
      params.push(section.trim().toUpperCase());
      query += ` AND UPPER(q.section) = $${params.length}`;
    }
    if (domain && domain !== "ALL") {
      params.push(domain.trim());
      query += ` AND q.domain = $${params.length}`;
    }
    if (topicCode && topicCode !== "ALL") {
      params.push(topicCode.trim());
      query += ` AND q.topic_code = $${params.length}`;
    }
    if (difficulty && difficulty !== "ALL") {
      params.push(difficulty.trim().toLowerCase());
      query += ` AND LOWER(q.difficulty) = $${params.length}`;
    }

    if (random) {
      query += ` ORDER BY RANDOM() LIMIT $${params.length + 1};`;
    } else {
      query += ` ORDER BY q.id ASC LIMIT $${params.length + 1};`;
    }
    params.push(limit);

    const { rows } = await pool.query(query, params);
    return NextResponse.json({ questions: rows });
  } catch (error: any) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
