const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function run() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const s = await pool.query(`
    SELECT section, domain, difficulty, count(*)::int as count 
    FROM vespera.questions 
    GROUP BY section, domain, difficulty 
    ORDER BY section, domain, difficulty;
  `);
  console.table(s.rows);

  const total = await pool.query(`
    SELECT section, count(*)::int as total
    FROM vespera.questions
    GROUP BY section;
  `);
  console.table(total.rows);

  await pool.end();
}

run();
