const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function listMathTopics() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query("SELECT code, domain, title_en, title_uz FROM vespera.topics WHERE section = 'MATH' ORDER BY code");
  res.rows.forEach(r => console.log(`${r.code.padEnd(8)} | ${r.domain.padEnd(32)} | ${r.title_en}`));
  await pool.end();
}

listMathTopics().catch(console.error);
