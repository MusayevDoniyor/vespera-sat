import { NextRequest, NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { hashPassword, signSessionToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const body = await req.json();
    const {
      email,
      password,
      fullName,
      mathLevel = "intermediate",
      englishLevel = "intermediate",
      ieltsScore = null,
      currentSatScore = null,
      targetSatScore = 1550,
      examDate = null,
      dailyGoalMinutes = 45,
      priorityWeakness = null,
    } = body;

    // Basic validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (fullName || cleanEmail.split("@")[0] || "SAT Scholar").trim();

    // Check if user already exists
    const existing = await pool.query(
      "SELECT id FROM vespera.users WHERE email = $1 LIMIT 1;",
      [cleanEmail]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please log in." },
        { status: 409 }
      );
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const userId = crypto.randomUUID();
    const profileId = crypto.randomUUID();

    // Transaction to insert user and profile
    const client = await pool.connect();
    try {
      await client.query("BEGIN;");

      await client.query(
        `INSERT INTO vespera.users (id, email, password_hash) VALUES ($1, $2, $3);`,
        [userId, cleanEmail, passwordHash]
      );

      await client.query(
        `
        INSERT INTO vespera.user_profiles (
          id,
          user_id,
          full_name,
          math_level,
          english_level,
          ielts_score,
          current_sat_score,
          target_sat_score,
          exam_date,
          daily_goal_minutes,
          priority_weakness,
          onboarding_completed
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
        `,
        [
          profileId,
          userId,
          cleanName,
          mathLevel,
          englishLevel,
          ieltsScore ? String(ieltsScore).trim() : null,
          currentSatScore ? parseInt(currentSatScore, 10) : null,
          targetSatScore ? parseInt(targetSatScore, 10) : 1550,
          examDate ? String(examDate).trim() : null,
          dailyGoalMinutes ? parseInt(dailyGoalMinutes, 10) : 45,
          priorityWeakness || null,
          Boolean(body.onboardingCompleted),
        ]
      );

      await client.query("COMMIT;");
    } catch (txErr) {
      await client.query("ROLLBACK;");
      throw txErr;
    } finally {
      client.release();
    }

    // Sign session token
    const token = await signSessionToken({
      userId,
      email: cleanEmail,
      fullName: cleanName,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: cleanEmail,
        fullName: cleanName,
        mathLevel,
        englishLevel,
        ieltsScore,
        currentSatScore,
        targetSatScore,
        examDate,
        dailyGoalMinutes,
        onboardingCompleted: Boolean(body.onboardingCompleted),
      },
    });

    // Set HttpOnly session cookie
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
    console.error("Register error:", err);
    return NextResponse.json(
      { error: err.message || "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
