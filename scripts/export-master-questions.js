const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function exportAll() {
  console.log('Connecting to Neon PostgreSQL...');
  const res = await pool.query(`
    SELECT 
      q.id,
      q.section,
      q.domain,
      q.topic_code,
      t.title_en as topic_title_en,
      t.title_uz as topic_title_uz,
      q.difficulty,
      q.prompt,
      q.passage,
      q.options,
      q.correct_answer,
      q.explanation_uz,
      q.explanation_en,
      q.desmos_trick,
      q.reference_formula,
      q.created_at
    FROM vespera.questions q
    LEFT JOIN vespera.topics t ON t.code = q.topic_code
    ORDER BY q.id ASC
  `);
  
  console.log('Exported from Neon questions count:', res.rows.length);
  fs.writeFileSync('materials/all_questions_master.json', JSON.stringify(res.rows, null, 2), 'utf8');
  console.log('Saved to materials/all_questions_master.json');
  await pool.end();
}

exportAll().catch(e => {
  console.error(e);
  process.exit(1);
});
