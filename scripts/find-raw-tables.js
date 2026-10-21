const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function findRawTablePassages() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query(`
    SELECT id, section, domain, prompt, passage 
    FROM vespera.questions 
    WHERE (passage ILIKE '%\\t%' OR prompt ILIKE '%\\t%' OR passage ILIKE '%table shows%' OR prompt ILIKE '%table shows%')
      AND (diagram_svg IS NULL OR diagram_svg = '')
  `);
  
  console.log(`Found ${res.rows.length} questions matching raw table/tab pattern:`);
  for (const r of res.rows) {
    const hasTableTag = /<table/i.test(r.passage || '') || /<table/i.test(r.prompt || '');
    console.log(`- ID: ${r.id} | Has <table>: ${hasTableTag} | Snippet: ${(r.passage || r.prompt || '').slice(0, 100).replace(/\n/g, ' ')}`);
  }
  await pool.end();
}

findRawTablePassages();
