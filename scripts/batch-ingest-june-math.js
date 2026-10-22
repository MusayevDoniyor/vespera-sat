const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("FATAL: GEMINI_API_KEY is not defined in .env or .env.local");
  process.exit(1);
}

const IMAGES_DIR = path.resolve('scripts/june_math_images');
const OUTPUT_FILE = path.resolve('scripts/june_extracted_questions.json');

// Models to rotate if rate-limited
const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-flash-lite-latest',
  'gemini-2.5-flash-lite'
];
let currentModelIdx = 0;

function robustParseJson(str) {
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
  if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
  if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
  cleaned = cleaned.trim();

  try {
    return JSON.parse(cleaned);
  } catch (e1) {
    // Attempt 2: Fix invalid unicode escapes and unescaped LaTeX backslashes
    let s = cleaned.replace(/\\u(?![0-9a-fA-F]{4})/g, '\\\\u');
    s = s.replace(/\\([^"\\\/bfnrtu])/g, '\\\\$1');
    try {
      return JSON.parse(s);
    } catch (e2) {
      // Attempt 3: Double escape all single backslashes
      let s3 = cleaned.replace(/\\/g, '\\\\');
      try {
        return JSON.parse(s3);
      } catch (e3) {
        throw new Error(`JSON parse failed: ${e1.message}`);
      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Load existing progress
let questions = [];
if (fs.existsSync(OUTPUT_FILE)) {
  try {
    questions = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    console.log(`Loaded ${questions.length} existing extracted questions from ${OUTPUT_FILE}`);
  } catch (e) {
    console.error("Error reading existing output, starting fresh:", e.message);
  }
}

const doneIds = new Set(questions.map(q => q.page_num));

async function extractSingleQuestion(pageNum) {
  const fileNum = String(pageNum).padStart(3, '0');
  const imgPath = path.join(IMAGES_DIR, `page_${fileNum}.png`);

  if (!fs.existsSync(imgPath)) {
    console.error(`Image not found: ${imgPath}`);
    return null;
  }

  const imgData = fs.readFileSync(imgPath).toString('base64');

  const promptText = `You are an expert Digital SAT Math educator. Extract this authentic SAT Math question from the screenshot into valid JSON with this EXACT schema:
{
  "domain": "Algebra" | "Advanced Math" | "Problem Solving and Data Analysis" | "Geometry and Trigonometry",
  "topic_code": "ALG-01" | "ALG-02" | "ADV-01" | "ADV-02" | "PRB-01" | "PRB-02" | "GEO-01" | "GEO-02",
  "difficulty": "Easy" | "Medium" | "Hard",
  "prompt": "Clean question prompt with standard KaTeX formulas (e.g. $f(x) = \\\\frac{12}{11-x}$, $\\\\triangle ABC$, etc.). Do not include answer options here.",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correct_answer": "Letter (A, B, C, or D) OR numeric value if grid-in",
  "is_grid_in": false or true,
  "explanation_en": "Clear, professional step-by-step solution in English.",
  "explanation_uz": "Aniq va tushunarli bosqichma-bosqich o'zbekcha yechim.",
  "desmos_trick": "Exact Desmos calculator shortcut, graph intersection, or regression trick.",
  "desmos_latex": "Desmos formula or command (e.g. y = -ax^2 + bx + c)"
}

IMPORTANT INSTRUCTIONS:
1. Examine the screenshot carefully. The question is from a real test.
2. If it is Multiple Choice:
   - Identify the 4 options.
   - The verified correct answer is marked with a purple/violet border or checkmark. Set "correct_answer" to that letter ("A", "B", "C", or "D").
   - "options" must be an array of 4 items prefixed with "A. ", "B. ", "C. ", "D. ".
   - "is_grid_in" = false.
3. If it is Student-Produced Response (Grid-in):
   - "options" MUST be empty array [].
   - "is_grid_in" = true.
   - The correct answer is typed inside the input box in the screenshot. Set "correct_answer" to that exact number or fraction (e.g. "6", "23", "-103", "68", "7").
4. Format all mathematical variables and expressions in KaTeX: $x$, $y$, $f(x)$, fractions, exponents, square roots, degrees.
5. Return ONLY the raw JSON object, without backticks or markdown fences.`;

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
  while (retries < 6) {
    const model = MODELS[currentModelIdx % MODELS.length];
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (resp.status === 429) {
        console.warn(`[Page ${pageNum}] Rate limited (429) on ${model}. Switching model and backing off...`);
        currentModelIdx++;
        retries++;
        await sleep(5000 * retries);
        continue;
      }

      if (!resp.ok) {
        const errText = await resp.text();
        console.error(`[Page ${pageNum}] Error ${resp.status} on ${model}: ${errText.slice(0, 150)}`);
        retries++;
        currentModelIdx++;
        await sleep(4000);
        continue;
      }

      const data = await resp.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error("Empty candidate text");
      }

      // Parse JSON
      let cleaned = rawText.trim();
      if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
      if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
      if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
      cleaned = cleaned.trim();

      const parsed = robustParseJson(rawText);

      let topic = (parsed.topic_code || 'ALG-01').toUpperCase().trim();
      let domain = parsed.domain || 'Algebra';
      if (topic.startsWith('PRB') || topic.startsWith('DAT')) {
        if (!['DAT-01', 'DAT-02', 'DAT-03', 'DAT-04'].includes(topic)) topic = 'DAT-01';
        domain = 'Problem Solving & Data Analysis';
      } else if (topic.startsWith('ALG')) {
        if (!['ALG-01', 'ALG-02', 'ALG-03', 'ALG-04'].includes(topic)) topic = 'ALG-01';
        domain = 'Algebra';
      } else if (topic.startsWith('ADV')) {
        if (!['ADV-01', 'ADV-02', 'ADV-03', 'ADV-04', 'ADV-05'].includes(topic)) topic = 'ADV-01';
        domain = 'Advanced Math';
      } else if (topic.startsWith('GEO')) {
        if (!['GEO-01', 'GEO-02', 'GEO-03', 'GEO-04'].includes(topic)) topic = 'GEO-01';
        domain = 'Geometry & Trigonometry';
      }

      const record = {
        id: `q_june_2026_${fileNum}`,
        page_num: pageNum,
        section: "MATH",
        domain: domain,
        topic_code: topic,
        difficulty: parsed.difficulty || "Medium",
        prompt: parsed.prompt,
        passage: null,
        options: Array.isArray(parsed.options) ? parsed.options : [],
        correct_answer: String(parsed.correct_answer || '').trim(),
        is_grid_in: !!parsed.is_grid_in || (Array.isArray(parsed.options) && parsed.options.length === 0),
        explanation_en: parsed.explanation_en || "",
        explanation_uz: parsed.explanation_uz || "",
        desmos_trick: parsed.desmos_trick || "",
        desmos_latex: parsed.desmos_latex || "",
        diagram_svg: null,
        diagram_preset: null,
        source: "June 2026 Recalled Math DSAT"
      };

      return record;
    } catch (e) {
      console.error(`[Page ${pageNum}] Exception on attempt ${retries + 1}: ${e.message}`);
      retries++;
      currentModelIdx++;
      await sleep(4000);
    }
  }

  console.error(`[Page ${pageNum}] FAILED after multiple attempts.`);
  return null;
}

async function runBatch(startPage = 1, endPage = 190, delayMs = 3500) {
  console.log(`Starting batch extraction: Pages ${startPage} to ${endPage}`);
  
  for (let p = startPage; p <= endPage; p++) {
    if (doneIds.has(p)) {
      console.log(`[Page ${p}/${endPage}] Already done, skipping.`);
      continue;
    }

    const t0 = Date.now();
    const result = await extractSingleQuestion(p);
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);

    if (result) {
      questions.push(result);
      doneIds.add(p);
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(questions, null, 2), 'utf8');
      console.log(`[Page ${p}/${endPage}] (${elapsed}s) SUCCESS: ${result.topic_code} | Ans: ${result.correct_answer} | Prompt: ${result.prompt.slice(0, 60)}...`);
    } else {
      console.warn(`[Page ${p}/${endPage}] FAILED.`);
    }

    if (p < endPage) {
      await sleep(delayMs);
    }
  }

  console.log(`\nBatch extraction completed! Total questions collected: ${questions.length}`);
}

// Support command line args: node batch-ingest-june-math.js [start] [end]
const args = process.argv.slice(2);
const start = args[0] ? parseInt(args[0], 10) : 1;
const end = args[1] ? parseInt(args[1], 10) : 5;

runBatch(start, end).catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
