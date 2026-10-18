import { NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";

const topicsCache = new Map<string, { data: any; timestamp: number }>();
const TOPICS_CACHE_TTL_MS = 60000;

export async function GET(request: Request) {
  try {
    await initDb();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section") || "ALL";
    const cacheKey = section;

    const cached = topicsCache.get(cacheKey);
    const now = Date.now();
    if (cached && now - cached.timestamp < TOPICS_CACHE_TTL_MS) {
      return NextResponse.json(cached.data, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          "X-Vespera-Cache": "HIT",
        },
      });
    }

    let query = `
      SELECT 
        t.*,
        COUNT(q.id)::int as question_count,
        COUNT(CASE WHEN up.status = 'CORRECT' THEN 1 END)::int as mastered_count
      FROM vespera.topics t
      LEFT JOIN vespera.questions q ON q.topic_code = t.code
      LEFT JOIN vespera.user_progress up ON up.question_id = q.id
    `;
    const params: any[] = [];

    if (section && section !== "ALL") {
      query += ` WHERE t.section = $1`;
      params.push(section);
    }

    query += ` GROUP BY t.id ORDER BY t.sort_order ASC;`;

    const { rows } = await pool.query(query, params);
    const payload = { topics: rows };
    topicsCache.set(cacheKey, { data: payload, timestamp: Date.now() });

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error: any) {
    console.error("Error fetching topics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
