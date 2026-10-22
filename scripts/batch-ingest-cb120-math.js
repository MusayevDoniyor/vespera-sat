const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No GEMINI_API_KEY");
  process.exit(1);
}

const IMAGES_DIR = path.resolve('scripts/cb_120_images');
const OUTPUT_FILE = path.resolve('scripts/cb120_extracted_questions.json');
const MASTER_EXPORT = path.resolve('scripts/exported_all_questions.json');

const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-flash-lite-latest'
];
let currentModelIdx = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function robustParseJson(str) {
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (e1) {
    let s = cleaned.replace(/\\u(?![0-9a-fA-F]{4})/g, '\\\\u');
    s = s.replace(/\\([^"\\\/bfnrtu])/g, '\\\\$1');
    try {
      return JSON.parse(s);
    } catch (e2) {
      let s3 = cleaned.replace(/\\/g, '\\\\');
      try {
        return JSON.parse(s3);
      } catch (e3) {
        throw new Error(`JSON parse failed: ${e1.message}`);
      }
    }
  }
}

function normalizeTopicAndDomain(skill, domain) {
  const sk = (skill || '').toLowerCase();
  const dom = (domain || '').toLowerCase();

  if (dom.includes('geom') || dom.includes('trig') || sk.includes('triangle') || sk.includes('circle') || sk.includes('angle') || sk.includes('area') || sk.includes('volume')) {
    if (sk.includes('area') || sk.includes('volume') || sk.includes('perimeter')) {
      return { topic_code: 'GEO-01', domain: 'Geometry & Trigonometry' };
    }
    if (sk.includes('line') || sk.includes('angle') || sk.includes('similar')) {
      return { topic_code: 'GEO-02', domain: 'Geometry & Trigonometry' };
    }
    if (sk.includes('right') || sk.includes('trig') || sk.includes('sin') || sk.includes('cos') || sk.includes('tan')) {
      return { topic_code: 'GEO-03', domain: 'Geometry & Trigonometry' };
    }
    if (sk.includes('circle') || sk.includes('radius') || sk.includes('radian')) {
      return { topic_code: 'GEO-04', domain: 'Geometry & Trigonometry' };
    }
    return { topic_code: 'GEO-01', domain: 'Geometry & Trigonometry' };
  }

  if (dom.includes('prob') || dom.includes('data') || sk.includes('percent') || sk.includes('ratio') || sk.includes('statistic') || sk.includes('scatter')) {
    if (sk.includes('ratio') || sk.includes('rate') || sk.includes('proportion')) return { topic_code: 'DAT-01', domain: 'Problem Solving & Data Analysis' };
    if (sk.includes('percent')) return { topic_code: 'DAT-02', domain: 'Problem Solving & Data Analysis' };
    if (sk.includes('stat') || sk.includes('mean') || sk.includes('median')) return { topic_code: 'DAT-03', domain: 'Problem Solving & Data Analysis' };
    return { topic_code: 'DAT-04', domain: 'Problem Solving & Data Analysis' };
  }

  if (dom.includes('adv') || sk.includes('quad') || sk.includes('expon') || sk.includes('radical') || sk.includes('nonlinear')) {
    if (sk.includes('equiv') || sk.includes('polynom')) return { topic_code: 'ADV-01', domain: 'Advanced Math' };
    if (sk.includes('quad') || sk.includes('parabol')) return { topic_code: 'ADV-02', domain: 'Advanced Math' };
    if (sk.includes('expon')) return { topic_code: 'ADV-03', domain: 'Advanced Math' };
    if (sk.includes('radic')) return { topic_code: 'ADV-04', domain: 'Advanced Math' };
    return { topic_code: 'ADV-05', domain: 'Advanced Math' };
  }

  // Algebra fallback
  if (sk.includes('two var') || sk.includes('graph')) return { topic_code: 'ALG-02', domain: 'Algebra' };
  if (sk.includes('system')) return { topic_code: 'ALG-03', domain: 'Algebra' };
  if (sk.includes('inequal')) return { topic_code: 'ALG-04', domain: 'Algebra' };
  return { topic_code: 'ALG-01', domain: 'Algebra' };
}

// Load existing progress
let questions = [];
if (fs.existsSync(OUTPUT_FILE)) {
  try {
    questions = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    console.log(`Loaded ${questions.length} existing extracted questions from ${OUTPUT_FILE}`);
  } catch (e) {
    questions = [];
  }
}
const donePages = new Set(questions.map(q => q.page_num));

async function extractPageQuestions(pageNum) {
  const fileNum = String(pageNum).padStart(2, '0');
  const imgPath = path.join(IMAGES_DIR, `page_${fileNum}.png`);

  if (!fs.existsSync(imgPath)) {
    console.error(`Image not found: ${imgPath}`);
    return [];
  }

  const imgData = fs.readFileSync(imgPath).toString('base64');

  const promptText = `This image is Page ${pageNum} of 42 from the College Board Educator Question Bank ("College Board New Qs (120) by @satmath_1").
It contains 2 or 3 official Digital SAT Math questions.
Extract ALL questions on this page into a valid JSON array of objects with this schema:
[
  {
    "question_id": "official Question ID shown on page, e.g. ecc98c87",
    "domain": "Geometry & Trigonometry" | "Algebra" | "Advanced Math" | "Problem Solving & Data Analysis",
    "skill": "skill listed in the header",
    "difficulty": "Easy" | "Medium" | "Hard",
    "prompt": "Clean, complete prompt with KaTeX math (e.g. $x$, $\\\\sqrt{2344}$, $\\\\triangle ABC$, angles, tables, etc.). If a diagram/figure is described, make the prompt completely clear and self-contained.",
    "diagram_preset": "circle_coordinate" | "parallel_lines" | "right_triangle_trig" | "right_triangle_altitude" | "parabola_tangent" | null,
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "is_grid_in": false or true,
    "correct_answer": "A" or "B" or "C" or "D" or numeric string if grid-in,
    "explanation_en": "Step-by-step academic explanation in English solving the problem thoroughly.",
    "explanation_uz": "Aniq, ravon va to'liq o'zbek tilidagi yechim.",
    "desmos_trick": "Exact Desmos calculator shortcut, graph intersection, or regression trick.",
    "desmos_latex": "Desmos formula or command"
  }
]
Note: Solve each question accurately to provide the verified correct answer.
Return ONLY the raw JSON array without markdown fences.`;

  const payload = {
    contents: [
      {
        parts: [
          { text: promptText },
          { inline_data: { mime_type: 'image/png', data: imgData } }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      response_mime_type: "application/json"
    }
  };

  let retries = 0;
  while (retries < 5) {
    const model = MODELS[currentModelIdx % MODELS.length];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (resp.status === 429 || resp.status === 503) {
        currentModelIdx++;
        retries++;
        await sleep(4000 * retries);
        continue;
      }

      if (!resp.ok) {
        retries++;
        currentModelIdx++;
        await sleep(3000);
        continue;
      }

      const data = await resp.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Empty candidate text");

      const items = robustParseJson(rawText);
      if (!Array.isArray(items)) throw new Error("Parsed result is not an array");

      const processed = items.map((q, qIdx) => {
        const { topic_code, domain } = normalizeTopicAndDomain(q.skill, q.domain);
        let ans = String(q.correct_answer || '').trim();
        if (ans.startsWith('A.') || ans.startsWith('A)')) ans = 'A';
        else if (ans.startsWith('B.') || ans.startsWith('B)')) ans = 'B';
        else if (ans.startsWith('C.') || ans.startsWith('C)')) ans = 'C';
        else if (ans.startsWith('D.') || ans.startsWith('D)')) ans = 'D';

        return {
          id: `q_cb120_p${fileNum}_${qIdx + 1}`,
          page_num: pageNum,
          cb_question_id: q.question_id || null,
          section: "MATH",
          domain: domain,
          topic_code: topic_code,
          difficulty: q.difficulty || "Medium",
          prompt: q.prompt,
          passage: null,
          options: Array.isArray(q.options) ? q.options : [],
          correct_answer: ans,
          is_grid_in: !!q.is_grid_in || (Array.isArray(q.options) && q.options.length === 0),
          explanation_en: q.explanation_en || "",
          explanation_uz: q.explanation_uz || "",
          desmos_trick: q.desmos_trick || "",
          desmos_latex: q.desmos_latex || "",
          diagram_svg: null,
          diagram_preset: q.diagram_preset || null,
          source: "College Board Official Question Bank (120 Qs)"
        };
      });

      return processed;
    } catch (e) {
      retries++;
      currentModelIdx++;
      await sleep(3000);
    }
  }

  return [];
}

async function seedToDb(newQuestions) {
  console.log(`\n--- Seeding ${newQuestions.length} CB120 questions to PostgreSQL ---`);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    for (const q of newQuestions) {
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
        q.passage,
        JSON.stringify(q.options),
        q.correct_answer,
        q.explanation_uz,
        q.explanation_en,
        q.desmos_trick,
        q.diagram_svg,
        q.diagram_preset
      ]);
    }
    await client.query('COMMIT');
    console.log(`Successfully seeded ${newQuestions.length} CB120 questions into vespera.questions!`);

    // Master export update
    if (fs.existsSync(MASTER_EXPORT)) {
      const master = JSON.parse(fs.readFileSync(MASTER_EXPORT, 'utf8'));
      const map = new Map(master.map(item => [item.id, item]));
      for (const q of newQuestions) map.set(q.id, q);
      const updated = Array.from(map.values());
      fs.writeFileSync(MASTER_EXPORT, JSON.stringify(updated, null, 2), 'utf8');
      console.log(`Updated master questions export: ${updated.length} total questions.`);
    }

    const countRes = await client.query(`SELECT section, count(*) as count FROM vespera.questions GROUP BY section;`);
    console.log("Database totals by section:", countRes.rows);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("DB Seed error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

async function runBatch() {
  console.log("=== Starting College Board 120 Math Questions Batch Ingestion ===");
  const totalPages = 42;

  for (let p = 1; p <= totalPages; p++) {
    if (donePages.has(p)) {
      console.log(`[Page ${p}/${totalPages}] Already extracted, skipping.`);
      continue;
    }

    const t0 = Date.now();
    const pageQs = await extractPageQuestions(p);
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

    if (pageQs.length > 0) {
      questions.push(...pageQs);
      donePages.add(p);
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(questions, null, 2), 'utf8');
      console.log(`[Page ${p}/${totalPages}] (${elapsed}s) SUCCESS: Extracted ${pageQs.length} questions (Total: ${questions.length})`);
    } else {
      console.warn(`[Page ${p}/${totalPages}] Warning: 0 questions extracted.`);
    }

    if (p < totalPages) await sleep(2500);
  }

  console.log(`\nAll 42 pages extracted! Total CB questions: ${questions.length}`);
  await seedToDb(questions);
}

runBatch().catch(console.error);
