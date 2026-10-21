const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function listAllGeometry() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query(`
    SELECT id, prompt, options, correct_answer 
    FROM vespera.questions 
    WHERE domain ILIKE '%Geometry%'
    ORDER BY id;
  `);

  console.log(`All ${res.rows.length} Geometry questions:`);
  res.rows.forEach((r, i) => {
    console.log(`[${i+1}] ${r.id}: ${r.prompt.slice(0, 95)}`);
  });
  await pool.end();
}

listAllGeometry();
