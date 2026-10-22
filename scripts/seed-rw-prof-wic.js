const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const ENRICHED_FILE = path.resolve('scripts/enriched_wic_questions.json');
const MASTER_EXPORT = path.resolve('scripts/exported_all_questions.json');

async function seed() {
  if (!fs.existsSync(ENRICHED_FILE)) {
    console.error(`File not found: ${ENRICHED_FILE}`);
    process.exit(1);
  }

  const questions = JSON.parse(fs.readFileSync(ENRICHED_FILE, 'utf8'));
  console.log(`Loaded ${questions.length} enriched Words in Context questions from ${ENRICHED_FILE}`);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  console.log("Connected to PostgreSQL successfully!");

  try {
    await client.query('BEGIN');
    let upsertCount = 0;

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
          explanation_en = EXCLUDED.explanation_en;
      `;

      await client.query(query, [
        q.id,
        'READING_WRITING',
        'Craft and Structure',
        'ENG-WIC',
        q.difficulty,
        q.prompt,
        q.passage || null,
        JSON.stringify(q.options || []),
        q.correct_answer,
        q.explanation_uz || '',
        q.explanation_en || '',
        null,
        null,
        null
      ]);
      upsertCount++;
    }

    await client.query('COMMIT');
    console.log(`Successfully upserted ${upsertCount} questions into vespera.questions!`);

    // Update master export
    if (fs.existsSync(MASTER_EXPORT)) {
      const master = JSON.parse(fs.readFileSync(MASTER_EXPORT, 'utf8'));
      const map = new Map(master.map(item => [item.id, item]));

      for (const q of questions) {
        map.set(q.id, {
          id: q.id,
          section: 'READING_WRITING',
          domain: 'Craft and Structure',
          topic_code: 'ENG-WIC',
          topicTitle: 'Words in Context',
          difficulty: q.difficulty,
          prompt: q.prompt,
          passage: q.passage || null,
          options: q.options,
          correct_answer: q.correct_answer,
          explanation_uz: q.explanation_uz || '',
          explanation_en: q.explanation_en || '',
          desmos_trick: null,
          diagram_svg: null,
          diagram_preset: null,
          source: 'Reading Writing Professor IV'
        });
      }

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
