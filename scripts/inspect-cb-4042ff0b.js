const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query("SELECT id, passage, prompt, explanation_en FROM vespera.questions WHERE id = 'cb_4042ff0b'");
  console.log(JSON.stringify(res.rows[0], null, 2));
  await pool.end();
}

main();
