const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is missing!");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function runAudit() {
  console.log("=================================================");
  console.log("🔍 COMPREHENSIVE DIGITAL SAT QUESTION BANK AUDIT");
  console.log("=================================================\n");

  const client = await pool.connect();
  try {
    await client.query("SET search_path TO vespera, public;");

    // 1. Overall counts
    const totalRes = await client.query("SELECT COUNT(*)::int as count FROM vespera.questions;");
    const totalCount = totalRes.rows[0].count;
    console.log(`📊 Total Questions in Bank: ${totalCount}`);

    // Section Breakdown
    const secRes = await client.query(`
      SELECT section, COUNT(*)::int as count 
      FROM vespera.questions 
      GROUP BY section 
      ORDER BY count DESC;
    `);
    console.log("\n📁 Section Breakdown:");
    for (const r of secRes.rows) {
      console.log(`   • ${r.section}: ${r.count} questions (${Math.round((r.count / totalCount) * 100)}%)`);
    }

    // Domain Breakdown
    const domRes = await client.query(`
      SELECT section, domain, COUNT(*)::int as count 
      FROM vespera.questions 
      GROUP BY section, domain 
      ORDER BY section, count DESC;
    `);
    console.log("\n📚 Domain Breakdown:");
    for (const r of domRes.rows) {
      console.log(`   • [${r.section}] ${r.domain}: ${r.count}`);
    }

    // Normalize difficulty casing first
    await client.query(`
      UPDATE vespera.questions SET difficulty = 'Hard' WHERE difficulty = 'HARD';
      UPDATE vespera.questions SET difficulty = 'Medium' WHERE difficulty = 'MEDIUM';
      UPDATE vespera.questions SET difficulty = 'Easy' WHERE difficulty = 'EASY';
    `);

    // Difficulty Breakdown after normalization
    const diffRes = await client.query(`
      SELECT difficulty, COUNT(*)::int as count 
      FROM vespera.questions 
      GROUP BY difficulty 
      ORDER BY count DESC;
    `);
    console.log("\n⚡ Difficulty Breakdown (Normalized):");
    for (const r of diffRes.rows) {
      console.log(`   • ${r.difficulty}: ${r.count} (${Math.round((r.count / totalCount) * 100)}%)`);
    }

    // Fetch all questions for in-depth inspection without heavy SVG payload
    const allQRes = await client.query(`
      SELECT id, topic_code, section, domain, difficulty, prompt, passage, options, correct_answer, 
             explanation_en, desmos_trick, reference_formula, 
             diagram_preset, (diagram_svg IS NOT NULL) as has_svg
      FROM vespera.questions;
    `);

    const questions = allQRes.rows;

    let emptyPromptCount = 0;
    let emptyExplanationCount = 0;
    let invalidOptionsJsonCount = 0;
    let nonFourOptionsCount = 0;
    let invalidCorrectAnswerCount = 0;
    let unclosedLatexCount = [];
    let uzbekWordsDetected = [];
    let cyrillicDetected = [];
    let telegramHandlesDetected = [];
    let diagramKeywordsWithoutDiagram = [];
    let desmosMathCount = 0;
    let withSvgCount = 0;
    let withPresetCount = 0;

    const uzbekRegex = /\b(bo'ladi|bo'lgan|yechimi|uchun|tushuntirish|javob|toping|hisoblang|berilgan|shart|funksiya|tenglama|chiziq|yuzasi|burchak|bunda|chizma|qiling|aytishicha|qanday|qaysi|qiymatini)\b/i;
    const cyrillicRegex = /[\u0400-\u04FF]/;
    const telegramRegex = /(@[a-zA-Z0-9_]{3,}|t\.me\/|telegram)/i;
    const diagramKeywordsRegex = /\b(in the figure shown|in the figure above|in the figure below|the figure above shows|the figure below shows|in the xy-plane above|right triangle above|the graph of .* is shown)\b/i;

    for (const q of questions) {
      // Missing fields
      if (!q.prompt || q.prompt.trim().length === 0) emptyPromptCount++;
      if (!q.explanation_en || q.explanation_en.trim().length === 0) emptyExplanationCount++;

      // Options parsing
      let opts = [];
      try {
        opts = typeof q.options === "string" ? JSON.parse(q.options) : q.options;
        if (!Array.isArray(opts)) {
          invalidOptionsJsonCount++;
        } else if (opts.length !== 4) {
          nonFourOptionsCount++;
        }
      } catch {
        invalidOptionsJsonCount++;
      }

      // Correct answer check
      const validAnswers = ["A", "B", "C", "D"];
      if (!validAnswers.includes(q.correct_answer?.trim()?.toUpperCase())) {
        invalidCorrectAnswerCount++;
      }

      // LaTeX Dollar balance check in prompt
      const dollarCount = (q.prompt.match(/\$/g) || []).length;
      if (dollarCount % 2 !== 0) {
        unclosedLatexCount.push({ id: q.id, dollarCount, prompt: q.prompt.slice(0, 60) });
      }

      // Language check (English verification)
      const allText = `${q.prompt} ${q.passage || ""} ${q.explanation_en || ""} ${JSON.stringify(q.options)}`;

      if (uzbekRegex.test(allText)) {
        const match = allText.match(uzbekRegex);
        uzbekWordsDetected.push({ id: q.id, word: match ? match[0] : "", section: q.section });
      }

      if (cyrillicRegex.test(allText)) {
        cyrillicDetected.push({ id: q.id, section: q.section });
      }

      if (telegramRegex.test(allText)) {
        const match = allText.match(telegramRegex);
        telegramHandlesDetected.push({ id: q.id, match: match ? match[0] : "" });
      }

      // Diagrams
      if (q.has_svg) withSvgCount++;
      if (q.diagram_preset) withPresetCount++;

      // Diagram keyword check for math questions
      if (q.section === "MATH" && diagramKeywordsRegex.test(q.prompt)) {
        if (!q.diagram_preset && !q.has_svg) {
          diagramKeywordsWithoutDiagram.push({ id: q.id, prompt: q.prompt.slice(0, 80) });
        }
      }

      // Desmos trick check
      if (q.section === "MATH" && q.desmos_trick) {
        desmosMathCount++;
      }
    }

    console.log("\n-------------------------------------------------");
    console.log("🛡️ INTEGRITY & QUALITY CHECKS:");
    console.log("-------------------------------------------------");
    console.log(`• Empty Prompts: ${emptyPromptCount}`);
    console.log(`• Empty Explanations: ${emptyExplanationCount}`);
    console.log(`• Invalid Options JSON: ${invalidOptionsJsonCount}`);
    console.log(`• Non-4 Options Questions: ${nonFourOptionsCount}`);
    console.log(`• Invalid Correct Answers (not A-D): ${invalidCorrectAnswerCount}`);
    console.log(`• Unbalanced LaTeX $ signs: ${unclosedLatexCount.length}`);
    if (unclosedLatexCount.length > 0) {
      console.log("  Unclosed LaTeX samples:", unclosedLatexCount.slice(0, 5));
    }
    console.log(`• Uzbek Remnants Detected: ${uzbekWordsDetected.length}`);
    if (uzbekWordsDetected.length > 0) {
      console.log("  Uzbek hits:", uzbekWordsDetected.slice(0, 5));
    }
    console.log(`• Cyrillic Characters Detected: ${cyrillicDetected.length}`);
    if (cyrillicDetected.length > 0) {
      console.log("  Cyrillic hits:", cyrillicDetected.slice(0, 5));
    }
    console.log(`• Telegram / Third-Party Handles: ${telegramHandlesDetected.length}`);
    if (telegramHandlesDetected.length > 0) {
      console.log("  Handle hits:", telegramHandlesDetected.slice(0, 5));
    }
    console.log(`• Questions with Attached Vector SVG Diagram: ${withSvgCount}`);
    console.log(`• Questions with Diagram Preset: ${withPresetCount}`);
    console.log(`• Math Questions Mentioning Diagrams without SVG/Preset: ${diagramKeywordsWithoutDiagram.length}`);
    if (diagramKeywordsWithoutDiagram.length > 0) {
      console.log("  Diagram keyword matches without asset:", diagramKeywordsWithoutDiagram.slice(0, 8));
    }
    console.log(`• Math Questions with Desmos 10s Hack: ${desmosMathCount} / 583 (${Math.round((desmosMathCount / 583) * 100)}%)`);

    // 3. Reading & Writing Passage telemetry
    const rwQuestions = questions.filter(q => q.section === "READING_WRITING");
    const rwWithPassage = rwQuestions.filter(q => q.passage && q.passage.trim().length > 0);
    console.log("\n📖 Reading & Writing Section Telemetry:");
    console.log(`• Total RW Questions: ${rwQuestions.length}`);
    console.log(`• Questions with Explicit Passage field: ${rwWithPassage.length}`);
    console.log(`• Questions where passage is integrated in prompt: ${rwQuestions.length - rwWithPassage.length}`);

  } catch (err) {
    console.error("Audit error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

runAudit();
