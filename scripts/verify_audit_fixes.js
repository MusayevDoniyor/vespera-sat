const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
});

async function verify() {
  const client = await pool.connect();
  try {
    const missing = await client.query(`
      SELECT id, prompt FROM vespera.questions 
      WHERE diagram_svg IS NULL AND diagram_preset IS NULL 
        AND (prompt ILIKE '%in the figure shown%' OR prompt ILIKE '%in the figure above%' OR prompt ILIKE '%in the figure,%' OR prompt ILIKE '%the graph of%is shown%');
    `);
    console.log("Unresolved diagram questions:", missing.rows.length);

    const controlChars = await client.query(`
      SELECT id FROM vespera.questions WHERE prompt LIKE E'%\\x0c%' OR explanation_en LIKE E'%\\x0c%';
    `);
    console.log("Unresolved \\x0c control characters:", controlChars.rows.length);

    const q39 = await client.query(`
      SELECT id, correct_answer, (diagram_svg IS NOT NULL) as has_svg, explanation_en FROM vespera.questions WHERE id = 'q_cb120_p39_2';
    `);
    console.log("q_cb120_p39_2 state -> ID:", q39.rows[0].id, "| Ans:", q39.rows[0].correct_answer, "| Has SVG:", q39.rows[0].has_svg);

    const totalRes = await client.query("SELECT count(*)::int as total FROM vespera.questions;");
    console.log("Total verified questions in DB:", totalRes.rows[0].total);
  } finally {
    client.release();
    await pool.end();
  }
}

verify();
