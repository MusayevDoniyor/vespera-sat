const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function check() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query("SELECT pid, state, query, age(clock_timestamp(), query_start) FROM pg_stat_activity WHERE state != 'idle'");
  console.log("Active queries count:", res.rows.length);
  res.rows.forEach(r => console.log(r.pid, r.state, r.age, r.query?.slice(0, 80)));
  await pool.end();
}
check().catch(console.error);
