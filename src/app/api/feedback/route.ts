import { NextRequest, NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;

    if (!userId) {
      return NextResponse.json({ reports: [] });
    }

    const res = await pool.query(
      `SELECT 
        id, type, question_id, title, description, image_url, status, admin_notes, created_at
       FROM vespera.feedback_reports
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 50;`,
      [userId]
    );

    return NextResponse.json({ reports: res.rows });
  } catch (err: any) {
    console.error("Feedback GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;

    const body = await req.json();
    const { type, questionId, title, description, imageUrl } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required." },
        { status: 400 }
      );
    }

    const id = "rep_" + Math.random().toString(36).substring(2, 11);
    await pool.query(
      `INSERT INTO vespera.feedback_reports (
        id, user_id, type, question_id, title, description, image_url, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'PENDING');`,
      [
        id,
        userId,
        type || "GENERAL",
        questionId || null,
        title.trim(),
        description.trim(),
        imageUrl || null,
      ]
    );

    return NextResponse.json({
      success: true,
      id,
      message: "Thank you for your feedback! Our team reviews reports daily.",
    });
  } catch (err: any) {
    console.error("Feedback submit error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
