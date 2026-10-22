const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function checkCbNewQs() {
  const rawText = fs.readFileSync('scripts/cb_new_qs_raw.txt', 'utf8');
  const matches = [...rawText.matchAll(/Question ID:\s*([a-f0-9]+)/gi)];
  const qids = [...new Set(matches.map(m => m[1].toLowerCase()))];
  console.log(`Found ${qids.length} unique Question IDs in cb_new_qs_raw.txt:`, qids.slice(0, 10));

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query("SELECT id FROM vespera.questions");
  const existingIds = new Set(res.rows.map(r => r.id.toLowerCase().replace(/^cb_/, '')));

  let inDb = 0;
  let missing = [];
  qids.forEach(qid => {
    if (existingIds.has(qid)) {
      inDb++;
    } else {
      missing.push(qid);
    }
  });

  console.log(`IDs already in DB: ${inDb}`);
  console.log(`IDs MISSING from DB: ${missing.length}`);
  console.log('Sample missing IDs:', missing.slice(0, 10));

  await pool.end();
}

checkCbNewQs();
