require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 20000,
});

async function run() {
  const client = await pool.connect();
  try {
    console.log("Connected to Neon DB. Executing DDL migrations...");
    await client.query("CREATE SCHEMA IF NOT EXISTS vespera; SET search_path TO vespera, public;");

    // 1. Add new columns to user_profiles
    await client.query(`
      ALTER TABLE vespera.user_profiles
        ADD COLUMN IF NOT EXISTS weekly_goal_hours INTEGER DEFAULT 12,
        ADD COLUMN IF NOT EXISTS preferred_study_time TEXT DEFAULT 'Evening',
        ADD COLUMN IF NOT EXISTS practice_mode TEXT DEFAULT 'timed',
        ADD COLUMN IF NOT EXISTS difficulty_mode TEXT DEFAULT 'adaptive',
        ADD COLUMN IF NOT EXISTS show_desmos BOOLEAN DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS show_ai_explanations BOOLEAN DEFAULT TRUE,
        ADD COLUMN IF NOT EXISTS include_vocab_review BOOLEAN DEFAULT TRUE;
    `);
    console.log("Updated vespera.user_profiles columns.");

    // 2. Create subscriptions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS vespera.subscriptions (
        id TEXT PRIMARY KEY,
        user_id TEXT UNIQUE REFERENCES vespera.users(id) ON DELETE CASCADE,
        plan TEXT NOT NULL DEFAULT 'FREE',
        billing_cycle TEXT DEFAULT 'MONTHLY',
        status TEXT NOT NULL DEFAULT 'ACTIVE',
        first_time_exams_used INTEGER DEFAULT 0,
        first_time_exams_limit INTEGER DEFAULT 5,
        retake_credits_used INTEGER DEFAULT 0,
        retake_credits_limit INTEGER DEFAULT 5,
        ai_queries_today INTEGER DEFAULT 0,
        ai_queries_daily_limit INTEGER DEFAULT 20,
        vocab_words_today INTEGER DEFAULT 0,
        vocab_words_daily_limit INTEGER DEFAULT 15,
        ai_plan_changes_used INTEGER DEFAULT 0,
        ai_plan_changes_limit INTEGER DEFAULT 3,
        current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        current_period_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON vespera.subscriptions(user_id);
      CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON vespera.subscriptions(plan);
    `);
    console.log("Created/verified vespera.subscriptions table.");

    // 3. Create feedback_reports table
    await client.query(`
      CREATE TABLE IF NOT EXISTS vespera.feedback_reports (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES vespera.users(id) ON DELETE SET NULL,
        type TEXT NOT NULL DEFAULT 'GENERAL',
        question_id TEXT REFERENCES vespera.questions(id) ON DELETE SET NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        status TEXT NOT NULL DEFAULT 'PENDING',
        admin_notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON vespera.feedback_reports(user_id);
      CREATE INDEX IF NOT EXISTS idx_feedback_status ON vespera.feedback_reports(status);
      CREATE INDEX IF NOT EXISTS idx_feedback_type ON vespera.feedback_reports(type);
    `);
    console.log("Created/verified vespera.feedback_reports table.");

    // 4. Verify existing tables
    const res = await client.query(`
      SELECT table_name FROM information_schema.tables WHERE table_schema = 'vespera' ORDER BY table_name;
    `);
    console.log("Current vespera tables:", res.rows.map(r => r.table_name));
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
