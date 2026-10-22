const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const JSON_FILE = path.resolve('scripts/cb120_extracted_questions.json');
const MASTER_EXPORT = path.resolve('scripts/exported_all_questions.json');

async function seed() {
  const questions = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
  console.log(`Loaded ${questions.length} questions from ${JSON_FILE}`);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  console.log("Connected to PostgreSQL successfully!");

  try {
    await client.query('BEGIN');
    let count = 0;

    for (const q of questions) {
      const query = `
        INSERT INTO vespera.questions (
          id, section, domain, topic_code, difficulty, prompt, passage,
          options, correct_answer, explanation_uz, explanation_en,
          desmos_trick, diagram_svg, diagram_preset, created_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8::jsonb, $9, $10, $11,
          $12, $13, $14, NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          section = EXCLUDED.section,
          domain = EXCLUDED.domain,
          topic_code = EXCLUDED.topic_code,
          difficulty = EXCLUDED.difficulty,
          prompt = EXCLUDED.prompt,
          passage = EXCLUDED.passage,
          options = EXCLUDED.options,
          correct_answer = EXCLUDED.correct_answer,
          explanation_uz = EXCLUDED.explanation_uz,
          explanation_en = EXCLUDED.explanation_en,
          desmos_trick = EXCLUDED.desmos_trick,
          diagram_svg = EXCLUDED.diagram_svg,
          diagram_preset = EXCLUDED.diagram_preset;
      `;

      await client.query(query, [
        q.id,
        'MATH',
        q.domain,
        q.topic_code,
        q.difficulty,
        q.prompt,
        q.passage || null,
        JSON.stringify(q.options || []),
        q.correct_answer,
        q.explanation_uz || '',
        q.explanation_en || '',
        q.desmos_trick || '',
        q.diagram_svg || null,
        q.diagram_preset || null
      ]);
      count++;
    }

    await client.query('COMMIT');
    console.log(`Successfully upserted ${count} questions into vespera.questions!`);

    // Update master export
    if (fs.existsSync(MASTER_EXPORT)) {
      const master = JSON.parse(fs.readFileSync(MASTER_EXPORT, 'utf8'));
      const map = new Map(master.map(item => [item.id, item]));
      for (const q of questions) map.set(q.id, q);
      const updated = Array.from(map.values());
      fs.writeFileSync(MASTER_EXPORT, JSON.stringify(updated, null, 2), 'utf8');
      console.log(`Updated master export: ${updated.length} total questions in ${MASTER_EXPORT}`);
    }

    const countRes = await client.query(`SELECT section, count(*) as count FROM vespera.questions GROUP BY section;`);
    console.log("Database totals by section:", countRes.rows);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Seeding error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
