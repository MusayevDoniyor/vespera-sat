import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, getFullUserProfile } from "@/lib/auth";
import { pool, initDb } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json(
        { user: null },
        { headers: { "Cache-Control": "private, no-cache, no-transform" } }
      );
    }

    await initDb();
    const profile = await getFullUserProfile(session.userId);
    return NextResponse.json(
      { user: profile },
      { headers: { "Cache-Control": "private, no-cache, no-transform" } }
    );
  } catch (err: any) {
    console.error("Auth me error:", err);
    return NextResponse.json({ user: null });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await initDb();

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
      weeklyGoalHours,
      preferredStudyTime,
      practiceMode,
      difficultyMode,
      showDesmos,
      showAiExplanations,
      includeVocabReview,
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
    if (weeklyGoalHours !== undefined) {
      updates.push(`weekly_goal_hours = $${idx++}`);
      values.push(weeklyGoalHours ? parseInt(weeklyGoalHours, 10) : 12);
    }
    if (preferredStudyTime !== undefined) {
      updates.push(`preferred_study_time = $${idx++}`);
      values.push(preferredStudyTime || "Evening");
    }
    if (practiceMode !== undefined) {
      updates.push(`practice_mode = $${idx++}`);
      values.push(practiceMode || "timed");
    }
    if (difficultyMode !== undefined) {
      updates.push(`difficulty_mode = $${idx++}`);
      values.push(difficultyMode || "adaptive");
    }
    if (showDesmos !== undefined) {
      updates.push(`show_desmos = $${idx++}`);
      values.push(Boolean(showDesmos));
    }
    if (showAiExplanations !== undefined) {
      updates.push(`show_ai_explanations = $${idx++}`);
      values.push(Boolean(showAiExplanations));
    }
    if (includeVocabReview !== undefined) {
      updates.push(`include_vocab_review = $${idx++}`);
      values.push(Boolean(includeVocabReview));
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
