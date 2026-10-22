const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function listTopics() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query('SELECT * FROM vespera.topics LIMIT 5');
  console.log('Sample topic record:', res.rows[0]);
  const all = await pool.query('SELECT code, domain FROM vespera.topics ORDER BY code');
  console.log(`Total topics in DB: ${all.rows.length}`);
  all.rows.forEach(r => console.log(r.code, '|', r.domain));
  await pool.end();
}

listTopics().catch(console.error);
