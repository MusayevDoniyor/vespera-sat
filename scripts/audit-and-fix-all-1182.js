const { Pool } = require('pg');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Load exams data for diagramSvgs and existing fixes
const examsDataPath = path.join(__dirname, '..', 'src', 'lib', 'bluebook-exams-data.json');
const exams = JSON.parse(fs.readFileSync(examsDataPath, 'utf8'));

// Build lookup map from bluebook exams data
const examQuestionMap = {};
exams.forEach(exam => {
  ['rwModule1', 'rwModule2Hard', 'rwModule2Easy', 'mathModule1', 'mathModule2Hard', 'mathModule2Easy'].forEach(modKey => {
    (exam[modKey] || []).forEach(q => {
      if (!examQuestionMap[q.id]) {
        examQuestionMap[q.id] = q;
      }
    });
  });
});

function cleanOcrJunk(str) {
  if (!str) return str;
  return str
    .replace(/--\s*\d+\s*of\s*\d+\s*--/gi, '')
    .replace(/Assessment\s+SAT\s+Test[\s\S]*$/gi, '')
    .replace(/QUESTION\s+\d+\s+OF\s+\d+/gi, '')
    .replace(/Mark for Review/gi, '')
    .trim();
}

function splitRwQuestion(q) {
  if (q.passage && q.passage.trim().length > 0) {
    return { passage: q.passage.trim(), prompt: q.prompt.trim(), method: 'already_split' };
  }

  const text = (q.prompt || '').trim();

  // Pattern 1: Student / Researcher notes
  const studentMatch = text.match(/\n?(The (?:student|researcher) wants to[\s\S]*?(?:Which|What)[\s\S]*?\?)\s*$/i);
  if (studentMatch && studentMatch.index !== undefined) {
    const passage = text.substring(0, studentMatch.index).trim();
    const prompt = studentMatch[1].trim();
    if (passage.length > 0 && prompt.length > 0) {
      return { passage, prompt, method: 'studentNotes' };
    }
  }

  // Pattern 2: Standard question stems near end of text
  const stemPatterns = [
    /\n\s*((?:Which|What) choice completes the text with the most logical transition\?)\s*$/i,
    /\n\s*((?:Which|What) choice completes the text with the most logical and precise word or phrase\?)\s*$/i,
    /\n\s*((?:Which|What) choice completes the text so that it conforms to the conventions of Standard English\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the function of[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the overall structure[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best states the main (?:idea|purpose)[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best summarizes the text\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the relationship[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice most effectively uses data from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice most effectively uses information from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) finding(?:, if true,)? would most (?:strongly|directly) (?:support|weaken)[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) finding from the [^\n\?]+, if true, would most (?:strongly|directly) (?:support|weaken)[\s\S]*?\?)\s*$/i,
    /\n\s*(As used in the text, (?:what|which) does the word[\s\S]*?\?)\s*$/i,
    /\n\s*(Based on the texts?,[\s\S]*?\?)\s*$/i,
    /\n\s*(According to the text,[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) quotation from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice[\s\S]*?\?)\s*$/i,
    /\n\s*(What does the text most strongly suggest[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) [^\n\?]+\?)\s*$/i,
  ];

  for (const pat of stemPatterns) {
    const match = text.match(pat);
    if (match && match.index !== undefined) {
      const passage = text.substring(0, match.index).trim();
      const prompt = match[1].trim();
      if (passage.length > 0 && prompt.length > 0) {
        return { passage, prompt, method: 'stemPatterns' };
      }
    }
  }

  // Pattern 3: Text with blank (______) but no explicit question stem
  if (text.includes('______') || text.includes('_______')) {
    let opts = [];
    try { opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options; } catch (e) {}
    const isTransition = (opts || []).some(o => /^(A\s+)?(However|Therefore|Furthermore|Consequently|In addition|Previously|Meanwhile|For example|Thus|Similarly)/i.test(o));
    const stem = isTransition
      ? 'Which choice completes the text with the most logical transition?'
      : 'Which choice completes the text so that it conforms to the conventions of Standard English?';
    return { passage: text, prompt: stem, method: 'blankInference' };
  }

  // Pattern 4: Fallback to last question sentence
  const lastQMark = text.lastIndexOf('?');
  if (lastQMark !== -1) {
    const prevNewline = text.lastIndexOf('\n', lastQMark);
    if (prevNewline !== -1) {
      const passage = text.substring(0, prevNewline).trim();
      const prompt = text.substring(prevNewline).trim();
      if (passage.length > 0 && prompt.length > 0) {
        return { passage, prompt, method: 'lastNewlineQ' };
      }
    }
  }

  return { passage: text, prompt: 'Which choice best answers the question based on the text?', method: 'fallback' };
}

async function auditAndFixAll() {
  console.log('Connecting to Neon PostgreSQL to audit all 1182 questions...');
  const res = await pool.query(`
    SELECT 
      q.id,
      q.section,
      q.domain,
      q.topic_code,
      t.title_en as topic_title_en,
      q.difficulty,
      q.prompt,
      q.passage,
      q.options,
      q.correct_answer,
      q.explanation_uz,
      q.explanation_en,
      q.desmos_trick,
      q.reference_formula,
      q.diagram_svg,
      q.diagram_preset
    FROM vespera.questions q
    LEFT JOIN vespera.topics t ON t.code = q.topic_code
    ORDER BY q.section ASC, q.domain ASC, q.id ASC
  `);

  const allQuestions = res.rows;
  console.log(`Fetched ${allQuestions.length} questions from Neon.`);

  const batchReports = [];
  const updatedQuestions = [];

  const BATCH_SIZE = 100;
  const totalBatches = Math.ceil(allQuestions.length / BATCH_SIZE);

  for (let b = 0; b < totalBatches; b++) {
    const startIdx = b * BATCH_SIZE;
    const endIdx = Math.min((b + 1) * BATCH_SIZE, allQuestions.length);
    const batchNumber = b + 1;
    const batchQs = allQuestions.slice(startIdx, endIdx);

    const batchLog = {
      batch: batchNumber,
      range: `${startIdx + 1} - ${endIdx}`,
      total: batchQs.length,
      fixedQuestions: []
    };

    for (let i = 0; i < batchQs.length; i++) {
      const q = batchQs[i];
      const qNum = startIdx + i + 1;
      const fixes = [];
      let isModified = false;

      // 1. Check if examQuestionMap has custom table/diagram
      const examQ = examQuestionMap[q.id];
      if (examQ) {
        if (examQ.diagramSvg && !q.diagram_svg) {
          q.diagram_svg = examQ.diagramSvg;
          isModified = true;
          fixes.push(`Attached official SVG/HTML table diagram`);
        }
        if (examQ.diagramPreset && !q.diagram_preset) {
          q.diagram_preset = examQ.diagramPreset;
          isModified = true;
          fixes.push(`Attached diagram preset: ${examQ.diagramPreset}`);
        }
        if (examQ.passage && (!q.passage || q.passage.length < 5)) {
          q.passage = examQ.passage;
          q.prompt = examQ.prompt;
          isModified = true;
          fixes.push(`Applied pre-formatted passage & prompt from exam form`);
        }
      }

      // 2. Parse & Clean Options
      let opts = [];
      try {
        opts = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
      } catch (e) {
        opts = [q.options];
        fixes.push('Fixed invalid JSON options');
        isModified = true;
      }

      let optionsHadJunk = false;
      const cleanedOpts = (opts || []).map(opt => {
        const cleaned = cleanOcrJunk(opt);
        if (cleaned !== opt) {
          optionsHadJunk = true;
        }
        return cleaned;
      });

      if (optionsHadJunk) {
        q.options = cleanedOpts;
        isModified = true;
        fixes.push(`Stripped trailing OCR metadata/page footers from options`);
      }

      // 3. Clean Prompt & Passage OCR junk
      const promptCleaned = cleanOcrJunk(q.prompt);
      if (promptCleaned !== q.prompt) {
        q.prompt = promptCleaned;
        isModified = true;
        fixes.push(`Stripped OCR metadata from prompt`);
      }

      if (q.passage) {
        const passageCleaned = cleanOcrJunk(q.passage);
        if (passageCleaned !== q.passage) {
          q.passage = passageCleaned;
          isModified = true;
          fixes.push(`Stripped OCR metadata from passage`);
        }
      }

      // 4. Reading & Writing Passage / Prompt Split
      if (q.section === 'READING_WRITING') {
        if (!q.passage || q.passage.trim() === '') {
          const split = splitRwQuestion(q);
          if (split.passage && split.prompt) {
            q.passage = split.passage;
            q.prompt = split.prompt;
            isModified = true;
            fixes.push(`Separated reading stimulus into left passage pane and isolated question stem`);
          }
        }
      }

      // 5. Difficulty Verification
      if (!['Easy', 'Medium', 'Hard'].includes(q.difficulty)) {
        const oldDiff = q.difficulty;
        q.difficulty = 'Medium';
        isModified = true;
        fixes.push(`Corrected invalid difficulty level from "${oldDiff}" to "Medium"`);
      }

      // 6. Multiple choice format validation
      if (q.section === 'READING_WRITING' && Array.isArray(q.options)) {
        if (q.options.length === 4) {
          const standardized = q.options.map((opt, oIdx) => {
            const letter = String.fromCharCode(65 + oIdx);
            if (!opt.startsWith(letter + ')') && !opt.startsWith(letter + '.')) {
              return `${letter}) ${opt.replace(/^[A-D][\.\)]\s*/, '').trim()}`;
            }
            return opt;
          });
          const optStrBefore = JSON.stringify(q.options);
          const optStrAfter = JSON.stringify(standardized);
          if (optStrBefore !== optStrAfter) {
            q.options = standardized;
            isModified = true;
            fixes.push(`Standardized option lettering to A), B), C), D)`);
          }
        }
      }

      if (isModified) {
        updatedQuestions.push(q);
        batchLog.fixedQuestions.push({
          qNum,
          id: q.id,
          section: q.section,
          domain: q.domain,
          difficulty: q.difficulty,
          fixes
        });
      }
    }

    batchReports.push(batchLog);
    console.log(`Batch ${batchNumber} (${batchLog.range}): ${batchLog.fixedQuestions.length} questions corrected.`);
  }

  // Update PostgreSQL in batches
  console.log(`Writing updates to Neon PostgreSQL for ${updatedQuestions.length} questions...`);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const q of updatedQuestions) {
      await client.query(`
        UPDATE vespera.questions
        SET 
          prompt = $1,
          passage = $2,
          options = $3,
          difficulty = $4,
          diagram_svg = $5,
          diagram_preset = $6
        WHERE id = $7
      `, [
        q.prompt,
        q.passage,
        JSON.stringify(q.options),
        q.difficulty,
        q.diagram_svg || null,
        q.diagram_preset || null,
        q.id
      ]);
    }
    await client.query('COMMIT');
    console.log('PostgreSQL transaction committed successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Database update failed:', err);
    throw err;
  } finally {
    client.release();
  }

  // Save audit snapshots
  fs.writeFileSync(path.join(__dirname, '..', 'materials', 'all_questions_master.json'), JSON.stringify(allQuestions, null, 2), 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'materials', 'vespera_question_bank_audit.json'), JSON.stringify(allQuestions, null, 2), 'utf8');
  fs.writeFileSync(path.join(__dirname, '..', 'materials', 'batch_audit_report.json'), JSON.stringify(batchReports, null, 2), 'utf8');

  console.log('Successfully saved audited JSON files and batch reports!');
  await pool.end();
}

auditAndFixAll().catch(err => {
  console.error(err);
  process.exit(1);
});
