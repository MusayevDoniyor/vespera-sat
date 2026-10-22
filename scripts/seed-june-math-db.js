const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const JSON_FILE = path.resolve('scripts/june_extracted_questions.json');
const MASTER_EXPORT = path.resolve('scripts/exported_all_questions.json');

function normalizeTopicAndDomain(topic, domain) {
  let t = (topic || '').toUpperCase().trim();
  let d = domain || '';

  if (t.startsWith('PRB') || t.startsWith('DAT')) {
    if (!['DAT-01', 'DAT-02', 'DAT-03', 'DAT-04'].includes(t)) t = 'DAT-01';
    d = 'Problem Solving & Data Analysis';
  } else if (t.startsWith('ALG')) {
    if (!['ALG-01', 'ALG-02', 'ALG-03', 'ALG-04'].includes(t)) t = 'ALG-01';
    d = 'Algebra';
  } else if (t.startsWith('ADV')) {
    if (!['ADV-01', 'ADV-02', 'ADV-03', 'ADV-04', 'ADV-05'].includes(t)) t = 'ADV-01';
    d = 'Advanced Math';
  } else if (t.startsWith('GEO')) {
    if (!['GEO-01', 'GEO-02', 'GEO-03', 'GEO-04'].includes(t)) t = 'GEO-01';
    d = 'Geometry & Trigonometry';
  } else {
    if (d.includes('Geom')) { t = 'GEO-01'; d = 'Geometry & Trigonometry'; }
    else if (d.includes('Data') || d.includes('Prob')) { t = 'DAT-01'; d = 'Problem Solving & Data Analysis'; }
    else if (d.includes('Adv')) { t = 'ADV-01'; d = 'Advanced Math'; }
    else { t = 'ALG-01'; d = 'Algebra'; }
  }

  return { topic_code: t, domain: d };
}

async function seedJuneMath() {
  if (!fs.existsSync(JSON_FILE)) {
    console.error(`Error: File ${JSON_FILE} does not exist.`);
    process.exit(1);
  }

  const questions = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
  console.log(`Loaded ${questions.length} questions from ${JSON_FILE}`);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  console.log("Connecting to PostgreSQL...");
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let inserted = 0;
    let updated = 0;

    for (const q of questions) {
      const qId = q.id;
      const optionsJson = JSON.stringify(q.options || []);
      const { topic_code, domain } = normalizeTopicAndDomain(q.topic_code, q.domain);

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
        qId,
        'MATH',
        domain,
        topic_code,
        q.difficulty || 'Medium',
        q.prompt,
        q.passage || null,
        optionsJson,
        q.correct_answer,
        q.explanation_uz || '',
        q.explanation_en || '',
        q.desmos_trick || '',
        q.diagram_svg || null,
        q.diagram_preset || null
      ]);

      inserted++;
    }

    await client.query('COMMIT');
    console.log(`Successfully upserted ${inserted} questions into vespera.questions!`);

    // Also update exported_all_questions.json if present
    if (fs.existsSync(MASTER_EXPORT)) {
      try {
        const master = JSON.parse(fs.readFileSync(MASTER_EXPORT, 'utf8'));
        const existingMap = new Map(master.map(item => [item.id, item]));
        for (const q of questions) {
          existingMap.set(q.id, q);
        }
        const updatedList = Array.from(existingMap.values());
        fs.writeFileSync(MASTER_EXPORT, JSON.stringify(updatedList, null, 2), 'utf8');
        console.log(`Updated master questions export: ${updatedList.length} total questions in ${MASTER_EXPORT}`);
      } catch (e) {
        console.warn("Could not update master export:", e.message);
      }
    }

    // Verify DB count
    const countRes = await client.query(`
      SELECT section, count(*) as count 
      FROM vespera.questions 
      GROUP BY section;
    `);
    console.log("Current Database totals by section:", countRes.rows);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Database seeding error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

seedJuneMath().catch(console.error);
