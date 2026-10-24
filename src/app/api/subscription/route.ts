import { NextRequest, NextResponse } from "next/server";
import { pool, initDb } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    await initDb();
    const session = await getSessionUser();
    const userId = session?.userId || null;

    if (!userId) {
      // Guest / Unauthenticated: Generous Free Tier Defaults
      return NextResponse.json({
        subscription: {
          plan: "FREE",
          billingCycle: "MONTHLY",
          status: "ACTIVE",
          firstTimeExamsUsed: 0,
          firstTimeExamsLimit: 5,
          retakeCreditsUsed: 0,
          retakeCreditsLimit: 5,
          aiQueriesToday: 0,
          aiQueriesDailyLimit: 20,
          vocabWordsToday: 0,
          vocabWordsDailyLimit: 15,
          aiPlanChangesUsed: 0,
          aiPlanChangesLimit: 3,
          isPro: false,
          daysLeftInCycle: 30,
        },
      });
    }

    // Look up user's subscription
    const subRes = await pool.query(
      `SELECT * FROM vespera.subscriptions WHERE user_id = $1 LIMIT 1;`,
      [userId]
    );

    let sub;
    if (subRes.rows.length === 0) {
      // Auto-provision Free tier subscription
      const subId = "sub_" + Math.random().toString(36).substring(2, 11);
      const insertRes = await pool.query(
        `INSERT INTO vespera.subscriptions (
          id, user_id, plan, billing_cycle, status,
          first_time_exams_used, first_time_exams_limit,
          retake_credits_used, retake_credits_limit,
          ai_queries_today, ai_queries_daily_limit,
          vocab_words_today, vocab_words_daily_limit,
          ai_plan_changes_used, ai_plan_changes_limit,
          current_period_start, current_period_end
        ) VALUES (
          $1, $2, 'FREE', 'MONTHLY', 'ACTIVE',
          0, 5,
          0, 5,
          0, 20,
          0, 15,
          0, 3,
          NOW(), NOW() + INTERVAL '30 days'
        ) RETURNING *;`,
        [subId, userId]
      );
      sub = insertRes.rows[0];
    } else {
      sub = subRes.rows[0];
    }

    // Calculate real exam counts taken this month from mock_exams
    const examsCountRes = await pool.query(
      `SELECT COUNT(*)::int as count FROM vespera.mock_exams
       WHERE user_id = $1 AND completed_at >= $2;`,
      [userId, sub.current_period_start]
    );
    const actualExamsUsed = examsCountRes.rows[0]?.count || 0;

    const isPro = sub.plan === "PRO";
    const now = new Date();
    const periodEnd = new Date(sub.current_period_end);
    const diffDays = Math.max(0, Math.ceil((periodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    return NextResponse.json({
      subscription: {
        id: sub.id,
        plan: sub.plan,
        billingCycle: sub.billing_cycle,
        status: sub.status,
        firstTimeExamsUsed: Math.max(sub.first_time_exams_used, actualExamsUsed),
        firstTimeExamsLimit: isPro ? 9999 : sub.first_time_exams_limit,
        retakeCreditsUsed: sub.retake_credits_used,
        retakeCreditsLimit: isPro ? 9999 : sub.retake_credits_limit,
        aiQueriesToday: sub.ai_queries_today,
        aiQueriesDailyLimit: isPro ? 9999 : sub.ai_queries_daily_limit,
        vocabWordsToday: sub.vocab_words_today,
        vocabWordsDailyLimit: isPro ? 9999 : sub.vocab_words_daily_limit,
        aiPlanChangesUsed: sub.ai_plan_changes_used,
        aiPlanChangesLimit: isPro ? 9999 : sub.ai_plan_changes_limit,
        isPro,
        daysLeftInCycle: diffDays,
        currentPeriodStart: sub.current_period_start,
        currentPeriodEnd: sub.current_period_end,
      },
    });
  } catch (err: any) {
    console.error("Subscription GET error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Please log in to manage your subscription." }, { status: 401 });
    }

    await initDb();
    const body = await req.json();
    const { action, billingCycle } = body; // action: "UPGRADE_PRO" | "DOWNGRADE_FREE"

    const isUpgrade = action === "UPGRADE_PRO";
    const plan = isUpgrade ? "PRO" : "FREE";
    const cycle = billingCycle || "MONTHLY";
    const intervalDays = cycle === "QUARTERLY" ? 90 : 30;

    const existing = await pool.query(
      `SELECT id FROM vespera.subscriptions WHERE user_id = $1 LIMIT 1;`,
      [session.userId]
    );

    if (existing.rows.length === 0) {
      const subId = "sub_" + Math.random().toString(36).substring(2, 11);
      await pool.query(
        `INSERT INTO vespera.subscriptions (
          id, user_id, plan, billing_cycle, status,
          first_time_exams_limit, retake_credits_limit,
          ai_queries_daily_limit, vocab_words_daily_limit,
          ai_plan_changes_limit,
          current_period_start, current_period_end
        ) VALUES (
          $1, $2, $3, $4, 'ACTIVE',
          $5, $6, $7, $8, $9,
          NOW(), NOW() + ($10 || ' days')::interval
        );`,
        [
          subId,
          session.userId,
          plan,
          cycle,
          isUpgrade ? 9999 : 5,
          isUpgrade ? 9999 : 5,
          isUpgrade ? 9999 : 20,
          isUpgrade ? 9999 : 15,
          isUpgrade ? 9999 : 3,
          intervalDays,
        ]
      );
    } else {
      await pool.query(
        `UPDATE vespera.subscriptions
         SET plan = $1,
             billing_cycle = $2,
             status = 'ACTIVE',
             first_time_exams_limit = $3,
             retake_credits_limit = $4,
             ai_queries_daily_limit = $5,
             vocab_words_daily_limit = $6,
             ai_plan_changes_limit = $7,
             current_period_start = NOW(),
             current_period_end = NOW() + ($8 || ' days')::interval,
             updated_at = NOW()
         WHERE user_id = $9;`,
        [
          plan,
          cycle,
          isUpgrade ? 9999 : 5,
          isUpgrade ? 9999 : 5,
          isUpgrade ? 9999 : 20,
          isUpgrade ? 9999 : 15,
          isUpgrade ? 9999 : 3,
          intervalDays,
          session.userId,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      plan,
      message: isUpgrade
        ? "🎉 Welcome to Vespera Pro! Unlimited mock exams, priority AI Tutor, and all PDF vault downloads are now unlocked."
        : "You are now on the Free Tier (5 mock exams/month, 20 AI queries/day, 15 vocab words/day).",
    });
  } catch (err: any) {
    console.error("Subscription update error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
