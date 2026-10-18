import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const domain = searchParams.get("domain");
    const topicCode = searchParams.get("topicCode");
    const difficulty = searchParams.get("difficulty");
    const random = searchParams.get("random") === "true";
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 200;

    const params: any[] = [];
    let progressJoin = `LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id IS NULL`;
    if (userId) {
      params.push(userId);
      progressJoin = `LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id = $${params.length}`;
    }

    let query = `
      SELECT 
        q.*,
        t.title_uz as topic_title_uz,
        t.title_en as topic_title_en,
        t.desmos_tips as topic_desmos_tips,
        up.status as progress_status,
        up.user_choice,
        up.time_spent
      FROM vespera.questions q
      JOIN vespera.topics t ON t.code = q.topic_code
      ${progressJoin}
      WHERE 1=1
    `;

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
    return NextResponse.json(
      { questions: rows },
      {
        headers: {
          "Cache-Control": "private, max-age=30, stale-while-revalidate=120",
        },
      }
    );
  } catch (error: any) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
