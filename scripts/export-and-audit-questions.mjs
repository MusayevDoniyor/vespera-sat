import fs from 'fs';
import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_saXeymWvA81k@ep-jolly-mode-asnk8cug-pooler.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require";

const pool = new Pool({ connectionString });

async function main() {
  console.log("Connecting to PostgreSQL to export and audit all questions...");
  const client = await pool.connect();

  try {
    const res = await client.query(`
      SELECT 
        q.id,
        q.section,
        q.domain,
        q.topic_code,
        t.title_en as topic_title,
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
      ORDER BY q.section, q.domain, q.id;
    `);

    const questions = res.rows;
    console.log(`Fetched ${questions.length} total questions from database.`);

    // Quality Audit Variables
    let invalidOptionsCount = 0;
    let missingCorrectAnswerCount = 0;
    let shortPromptCount = 0;
    let unparsedArtifactsCount = 0;
    let duplicatePromptSet = new Set();
    let duplicatePromptsCount = 0;
    const domainCounts = {};
    const sectionCounts = {};
    const difficultyCounts = {};

    const auditedQuestions = questions.map((q, idx) => {
      // Parse options
      let parsedOptions = [];
      try {
        parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
      } catch (e) {
        parsedOptions = [q.options];
        invalidOptionsCount++;
      }

      if (!Array.isArray(parsedOptions) || parsedOptions.length < 2) {
        invalidOptionsCount++;
      }

      // Check correct answer
      if (!q.correct_answer || q.correct_answer.trim() === '') {
        missingCorrectAnswerCount++;
      }

      // Check prompt length
      if (!q.prompt || q.prompt.trim().length < 15) {
        shortPromptCount++;
      }

      // Check for raw unparsed PDF page artifacts in prompt or rationale
      const fullText = (q.prompt || '') + ' ' + (q.explanation_en || '');
      if (/--\s*\d+\s*of\s*\d+\s*--/.test(fullText) || /Assessment\s+SAT\s+Test/.test(fullText)) {
        unparsedArtifactsCount++;
      }

      // Track duplicate prompts
      const promptSnippet = (q.prompt || '').slice(0, 100);
      if (duplicatePromptSet.has(promptSnippet)) {
        duplicatePromptsCount++;
      } else {
        duplicatePromptSet.add(promptSnippet);
      }

      // Statistics
      sectionCounts[q.section] = (sectionCounts[q.section] || 0) + 1;
      domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;
      difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;

      return {
        index: idx + 1,
        id: q.id,
        section: q.section,
        domain: q.domain,
        topicCode: q.topic_code,
        topicTitle: q.topic_title || 'General',
        difficulty: q.difficulty,
        prompt: q.prompt,
        passage: q.passage,
        options: parsedOptions,
        correctAnswer: q.correct_answer,
        explanationEn: q.explanation_en,
        explanationUz: q.explanation_uz,
        desmosTrick: q.desmos_trick,
        referenceFormula: q.reference_formula
      };
    });

    // Write to JSON files
    const exportPath = 'scripts/exported_all_questions.json';
    const auditPath = 'materials/vespera_question_bank_audit.json';

    fs.writeFileSync(exportPath, JSON.stringify(auditedQuestions, null, 2), 'utf8');
    fs.writeFileSync(auditPath, JSON.stringify(auditedQuestions, null, 2), 'utf8');

    console.log(`\n======================================================`);
    console.log(`🏆 VESPERA QUESTION BANK QUALITY AUDIT REPORT`);
    console.log(`======================================================`);
    console.log(`Total Questions Exported: ${auditedQuestions.length}`);
    console.log(`Saved JSON files to:`);
    console.log(` - ${exportPath} (${(fs.statSync(exportPath).size / 1024 / 1024).toFixed(2)} MB)`);
    console.log(` - ${auditPath} (${(fs.statSync(auditPath).size / 1024 / 1024).toFixed(2)} MB)`);

    console.log(`\n--- INTEGRITY CHECKS ---`);
    console.log(`Invalid Options: ${invalidOptionsCount} (0 expected)`);
    console.log(`Missing Correct Answer: ${missingCorrectAnswerCount} (0 expected)`);
    console.log(`Suspiciously Short Prompts: ${shortPromptCount} (0 expected)`);
    console.log(`Unparsed PDF Artifacts: ${unparsedArtifactsCount} (0 expected)`);
    console.log(`Duplicate Prompts: ${duplicatePromptsCount}`);

    console.log(`\n--- DISTRIBUTION BY SECTION ---`);
    console.table(sectionCounts);

    console.log(`\n--- DISTRIBUTION BY DOMAIN ---`);
    console.table(domainCounts);

    console.log(`\n--- DISTRIBUTION BY DIFFICULTY ---`);
    console.table(difficultyCounts);

    console.log(`\nSample Verified Question #1:`);
    console.log({
      id: auditedQuestions[0].id,
      domain: auditedQuestions[0].domain,
      difficulty: auditedQuestions[0].difficulty,
      prompt: auditedQuestions[0].prompt.slice(0, 100) + '...',
      options: auditedQuestions[0].options,
      correctAnswer: auditedQuestions[0].correctAnswer
    });

    console.log(`\nSample Verified Question #500:`);
    console.log({
      id: auditedQuestions[500].id,
      domain: auditedQuestions[500].domain,
      difficulty: auditedQuestions[500].difficulty,
      prompt: auditedQuestions[500].prompt.slice(0, 100) + '...',
      options: auditedQuestions[500].options,
      correctAnswer: auditedQuestions[500].correctAnswer
    });

  } catch (err) {
    console.error("Export error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
