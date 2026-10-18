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

    // Pagination parameters
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
    // Default limit is 10 for paginated views. If a caller specifies limit (e.g. 10, 20, 50, up to 200), respect it.
    const limit = limitParam ? Math.min(200, Math.max(1, parseInt(limitParam, 10))) : 10;
    const offset = (page - 1) * limit;

    const params: any[] = [];
    let progressJoin = `LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id IS NULL`;
    if (userId) {
      params.push(userId);
      progressJoin = `LEFT JOIN vespera.user_progress up ON up.question_id = q.id AND up.user_id = $${params.length}`;
    }

    let baseFilter = "WHERE 1=1";
    if (section && section !== "ALL") {
      params.push(section.trim().toUpperCase());
      baseFilter += ` AND UPPER(q.section) = $${params.length}`;
    }
    if (domain && domain !== "ALL") {
      params.push(domain.trim());
      baseFilter += ` AND q.domain = $${params.length}`;
    }
    if (topicCode && topicCode !== "ALL") {
      params.push(topicCode.trim());
      baseFilter += ` AND q.topic_code = $${params.length}`;
    }
    if (difficulty && difficulty !== "ALL") {
      params.push(difficulty.trim().toLowerCase());
      baseFilter += ` AND LOWER(q.difficulty) = $${params.length}`;
    }

    let query = `
      SELECT 
        q.*,
        t.title_uz as topic_title_uz,
        t.title_en as topic_title_en,
        t.desmos_tips as topic_desmos_tips,
        up.status as progress_status,
        up.user_choice,
        up.time_spent,
        COUNT(*) OVER() AS full_count
      FROM vespera.questions q
      JOIN vespera.topics t ON t.code = q.topic_code
      ${progressJoin}
      ${baseFilter}
    `;

    if (random) {
      query += ` ORDER BY RANDOM() LIMIT $${params.length + 1} OFFSET $${params.length + 2};`;
    } else {
      query += ` ORDER BY q.id ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2};`;
    }
    params.push(limit, offset);

    const { rows } = await pool.query(query, params);

    let total = 0;
    if (rows.length > 0) {
      total = parseInt(rows[0].full_count, 10) || 0;
      for (const r of rows) {
        delete r.full_count;
      }
    } else if (page > 1) {
      // If requested page is out of range, get total count using filter params
      const filterParams = params.slice(0, params.length - 2);
      const countRes = await pool.query(
        `SELECT COUNT(*)::int as total FROM vespera.questions q JOIN vespera.topics t ON t.code = q.topic_code ${progressJoin} ${baseFilter};`,
        filterParams
      );
      total = countRes.rows[0]?.total || 0;
    }

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json(
      {
        questions: rows,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      },
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
