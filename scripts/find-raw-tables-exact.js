const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function checkAllRealTables() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query('SELECT id, section, domain, prompt, passage, diagram_svg, diagram_preset FROM vespera.questions;');
  
  const rawTableQuestions = [];
  for (const q of res.rows) {
    const text = (q.passage || '') + ' ' + (q.prompt || '');
    // Check if contains tab character '\t'
    if (text.includes('\t')) {
      rawTableQuestions.push({
        id: q.id,
        section: q.section,
        hasSvg: !!q.diagram_svg,
        hasPreset: !!q.diagram_preset,
        tabCount: (text.match(/\t/g) || []).length,
        firstLine: text.split('\n')[0]
      });
    }
  }

  console.log(`Questions with actual tab characters: ${rawTableQuestions.length}`);
  console.table(rawTableQuestions);
  await pool.end();
}

checkAllRealTables();
