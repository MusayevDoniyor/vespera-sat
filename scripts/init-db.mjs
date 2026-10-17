import { Pool } from "pg";

const connectionString = "postgresql://kaizo:2009@localhost:5432/vespera";
const pool = new Pool({ connectionString });

async function init() {
  console.log("Connecting to PostgreSQL 'vespera'...");
  const client = await pool.connect();
  try {
    console.log("Creating tables...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS topics (
        id TEXT PRIMARY KEY,
        section TEXT NOT NULL,
        domain TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        title_uz TEXT NOT NULL,
        title_en TEXT NOT NULL,
        description_uz TEXT NOT NULL,
        desmos_tips TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        topic_code TEXT REFERENCES topics(code) ON DELETE CASCADE,
        section TEXT NOT NULL,
        domain TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        prompt TEXT NOT NULL,
        passage TEXT,
        options JSONB NOT NULL,
        correct_answer TEXT NOT NULL,
        explanation_uz TEXT NOT NULL,
        explanation_en TEXT NOT NULL,
        desmos_trick TEXT,
        reference_formula TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS user_progress (
        id TEXT PRIMARY KEY,
        question_id TEXT REFERENCES questions(id) ON DELETE CASCADE,
        status TEXT NOT NULL,
        user_choice TEXT,
        time_spent INTEGER DEFAULT 0,
        notes TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS error_logs (
        id TEXT PRIMARY KEY,
        question_id TEXT REFERENCES questions(id) ON DELETE CASCADE,
        mistake_type TEXT NOT NULL,
        notes TEXT,
        stage TEXT DEFAULT 'STAGE_1_DAY',
        next_review_at TIMESTAMP WITH TIME ZONE NOT NULL,
        is_resolved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS mock_exams (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        section TEXT NOT NULL,
        score INTEGER NOT NULL,
        math_score INTEGER,
        reading_score INTEGER,
        total_questions INTEGER NOT NULL,
        correct_count INTEGER NOT NULL,
        time_spent INTEGER NOT NULL,
        completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log("Tables created successfully. Seeding topics and questions...");
    
    // Import and seed
    const { default: seedFn } = await import("../prisma/seed.mjs").catch(() => ({ default: null }));
    
    const { rows: tRows } = await client.query("SELECT COUNT(*) FROM topics;");
    const { rows: qRows } = await client.query("SELECT COUNT(*) FROM questions;");
    console.log(`Current DB state: ${tRows[0].count} topics, ${qRows[0].count} questions.`);
  } finally {
    client.release();
    await pool.end();
  }
}

init().catch(console.error);
