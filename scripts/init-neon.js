const { Pool } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("Error: DATABASE_URL environment variable is required.");
  process.exit(1);
}

async function initNeon() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  const client = await pool.connect();
  try {
    console.log('Connecting to Neon PostgreSQL...');
    await client.query('CREATE SCHEMA IF NOT EXISTS vespera;');
    await client.query(`
      CREATE TABLE IF NOT EXISTS vespera.topics (
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

      CREATE TABLE IF NOT EXISTS vespera.questions (
        id TEXT PRIMARY KEY,
        topic_code TEXT REFERENCES vespera.topics(code) ON DELETE CASCADE,
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

      CREATE TABLE IF NOT EXISTS vespera.user_progress (
        id TEXT PRIMARY KEY,
        question_id TEXT REFERENCES vespera.questions(id) ON DELETE CASCADE,
        status TEXT NOT NULL,
        user_choice TEXT,
        time_spent INTEGER DEFAULT 0,
        notes TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS vespera.error_logs (
        id TEXT PRIMARY KEY,
        question_id TEXT REFERENCES vespera.questions(id) ON DELETE CASCADE,
        mistake_type TEXT NOT NULL,
        notes TEXT,
        stage TEXT DEFAULT 'STAGE_1_DAY',
        next_review_at TIMESTAMP WITH TIME ZONE NOT NULL,
        is_resolved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS vespera.mock_exams (
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
    
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'vespera'");
    console.log('Successfully provisioned tables in Neon `vespera` schema:', res.rows.map(r => r.table_name));
  } finally {
    client.release();
    await pool.end();
  }
}

initNeon().catch(err => {
  console.error('Neon setup error:', err);
  process.exit(1);
});
