const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function inspectFlagged() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const ids = ['q_real_sep2026_16', 'cb_4042ff0b', 'cb_e441da80', 'cb_f452410b', 'cb_145da981', 'cb_3118ca93', 'cb_38e79659', 'cb_983d33fa'];
  
  const res = await pool.query('SELECT * FROM vespera.questions WHERE id = ANY($1)', [ids]);
  for (const row of res.rows) {
    console.log(`\n================== ID: ${row.id} (${row.section} - ${row.domain}) ==================`);
    console.log('PASSAGE:', row.passage);
    console.log('PROMPT:', row.prompt);
    console.log('OPTIONS:', row.options);
    console.log('CORRECT:', row.correct_answer);
    console.log('DIAGRAM_SVG:', !!row.diagram_svg);
    console.log('DIAGRAM_PRESET:', row.diagram_preset);
    console.log('EXPLANATION_EN:', (row.explanation_en || '').slice(0, 150));
  }
  await pool.end();
}

inspectFlagged();
