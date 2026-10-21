const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function dump30() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const ids = [
    'cb_24c1b7e4', 'cb_014b3394', 'cb_01c1d9ee', 'cb_02848335', 'cb_0b96fa93',
    'cb_145da981', 'cb_1703403b', 'cb_30c3aa98', 'cb_37a49687', 'cb_38e79659',
    'cb_4042ff0b', 'cb_46e45728', 'cb_5d453dcc', 'cb_5ff1ba73', 'cb_75e07a4d',
    'cb_8af28416', 'cb_9debe79a', 'cb_b2e54b50', 'cb_be19faa1', 'cb_c4bee178',
    'cb_cbecb873', 'cb_ccb1ab92', 'cb_ccf414c9', 'cb_cf7491c1', 'cb_d102706f',
    'cb_d5b9ed0d', 'cb_df9c5a1d', 'cb_e441da80', 'cb_f452410b', 'cb_faaf484f'
  ];

  const res = await pool.query('SELECT * FROM vespera.questions WHERE id = ANY($1)', [ids]);
  fs.writeFileSync('scripts/extracted_30_table_questions.json', JSON.stringify(res.rows, null, 2), 'utf8');
  console.log(`Saved ${res.rows.length} questions to scripts/extracted_30_table_questions.json`);
  await pool.end();
}

dump30();
