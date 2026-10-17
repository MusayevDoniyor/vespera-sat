import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log("Applying SM-2 Spaced Repetition and Desmos Auto-Link columns...");
    await client.query(`
      ALTER TABLE questions ADD COLUMN IF NOT EXISTS desmos_latex TEXT;
      ALTER TABLE error_logs ADD COLUMN IF NOT EXISTS ease_factor FLOAT DEFAULT 2.5;
      ALTER TABLE error_logs ADD COLUMN IF NOT EXISTS repetitions INTEGER DEFAULT 0;
      ALTER TABLE error_logs ADD COLUMN IF NOT EXISTS interval_days INTEGER DEFAULT 1;
      ALTER TABLE error_logs ADD COLUMN IF NOT EXISTS retention_score FLOAT DEFAULT 100.0;
      ALTER TABLE error_logs ADD COLUMN IF NOT EXISTS last_quality INTEGER DEFAULT 3;
    `);
    console.log("✅ Database schema successfully upgraded with SM-2 Spaced Repetition parameters!");
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(console.error);
