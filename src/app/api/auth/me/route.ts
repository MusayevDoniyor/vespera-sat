import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, getFullUserProfile } from "@/lib/auth";
import { pool, initDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const profile = await getFullUserProfile(session.userId);
    return NextResponse.json({ user: profile });
  } catch (err: any) {
    console.error("Auth me error:", err);
    return NextResponse.json({ user: null });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await initDb();
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      fullName,
      mathLevel,
      englishLevel,
      ieltsScore,
      currentSatScore,
      targetSatScore,
      examDate,
      dailyGoalMinutes,
      priorityWeakness,
      onboardingCompleted,
    } = body;

    const updates: string[] = ["updated_at = NOW()"];
    const values: any[] = [];
    let idx = 1;

    if (fullName !== undefined) {
      updates.push(`full_name = $${idx++}`);
      values.push(fullName ? fullName.trim() : "SAT Scholar");
    }
    if (mathLevel !== undefined) {
      updates.push(`math_level = $${idx++}`);
      values.push(mathLevel);
    }
    if (englishLevel !== undefined) {
      updates.push(`english_level = $${idx++}`);
      values.push(englishLevel);
    }
    if (ieltsScore !== undefined) {
      updates.push(`ielts_score = $${idx++}`);
      values.push(ieltsScore ? String(ieltsScore).trim() : null);
    }
    if (currentSatScore !== undefined) {
      updates.push(`current_sat_score = $${idx++}`);
      values.push(currentSatScore ? parseInt(currentSatScore, 10) : null);
    }
    if (targetSatScore !== undefined) {
      updates.push(`target_sat_score = $${idx++}`);
      values.push(targetSatScore ? parseInt(targetSatScore, 10) : 1550);
    }
    if (examDate !== undefined) {
      updates.push(`exam_date = $${idx++}`);
      values.push(examDate ? String(examDate).trim() : null);
    }
    if (dailyGoalMinutes !== undefined) {
      updates.push(`daily_goal_minutes = $${idx++}`);
      values.push(dailyGoalMinutes ? parseInt(dailyGoalMinutes, 10) : 45);
    }
    if (priorityWeakness !== undefined) {
      updates.push(`priority_weakness = $${idx++}`);
      values.push(priorityWeakness || null);
    }
    if (onboardingCompleted !== undefined) {
      updates.push(`onboarding_completed = $${idx++}`);
      values.push(Boolean(onboardingCompleted));
    }

    values.push(session.userId);
    const userIdIdx = idx;

    await pool.query(
      `
      UPDATE vespera.user_profiles
      SET ${updates.join(", ")}
      WHERE user_id = $${userIdIdx};
      `,
      values
    );

    const updatedProfile = await getFullUserProfile(session.userId);
    return NextResponse.json({ success: true, user: updatedProfile });
  } catch (err: any) {
    console.error("Auth me update error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
