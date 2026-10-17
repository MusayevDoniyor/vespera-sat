import { NextRequest, NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { comparePassword, signSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Find user by email
    const res = await pool.query(
      `
      SELECT 
        u.id,
        u.email,
        u.password_hash,
        p.full_name,
        p.math_level,
        p.english_level,
        p.ielts_score,
        p.current_sat_score,
        p.target_sat_score,
        p.exam_date,
        p.daily_goal_minutes,
        p.priority_weakness,
        p.onboarding_completed
      FROM vespera.users u
      LEFT JOIN vespera.user_profiles p ON p.user_id = u.id
      WHERE u.email = $1
      LIMIT 1;
      `,
      [cleanEmail]
    );

    if (res.rows.length === 0) {
      return NextResponse.json(
        { error: "No account found with this email address. Please sign up." },
        { status: 401 }
      );
    }

    const userRow = res.rows[0];

    // Check password
    const passwordMatch = await comparePassword(password, userRow.password_hash);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const fullName = userRow.full_name || cleanEmail.split("@")[0];

    // Sign session token
    const token = await signSessionToken({
      userId: userRow.id,
      email: userRow.email,
      fullName,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userRow.id,
        email: userRow.email,
        fullName,
        mathLevel: userRow.math_level,
        englishLevel: userRow.english_level,
        ieltsScore: userRow.ielts_score,
        currentSatScore: userRow.current_sat_score,
        targetSatScore: userRow.target_sat_score,
        examDate: userRow.exam_date,
        dailyGoalMinutes: userRow.daily_goal_minutes,
        priorityWeakness: userRow.priority_weakness,
        onboardingCompleted: Boolean(userRow.onboarding_completed),
      },
    });

    // Set HttpOnly cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: err.message || "Login failed. Please try again." },
      { status: 500 }
    );
  }
}
