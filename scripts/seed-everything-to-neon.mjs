import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Error: DATABASE_URL environment variable is required.");
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function run() {
  const client = await pool.connect();
  try {
    console.log("Connecting to PostgreSQL...");
    await client.query("CREATE SCHEMA IF NOT EXISTS vespera; SET search_path TO vespera, public;");

    // 1. Ensure tables exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS topics (
        id TEXT PRIMARY KEY,
        section TEXT NOT NULL,
        domain TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        title_uz TEXT NOT NULL,
        title_en TEXT NOT NULL,
        description_uz TEXT NOT NULL,
        desmos_tips TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        topic_code TEXT REFERENCES topics(code) ON DELETE CASCADE,
        section TEXT NOT NULL,
        domain TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        prompt TEXT NOT NULL,
        passage TEXT,
        options JSONB NOT NULL,
        correct_answer TEXT NOT NULL,
        explanation_uz TEXT NOT NULL,
        explanation_en TEXT NOT NULL,
        desmos_trick TEXT,
        reference_formula TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS user_progress (
        id TEXT PRIMARY KEY,
        question_id TEXT REFERENCES questions(id) ON DELETE CASCADE,
        status TEXT NOT NULL,
        user_choice TEXT,
        time_spent INTEGER DEFAULT 0,
        notes TEXT,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS error_logs (
        id TEXT PRIMARY KEY,
        question_id TEXT REFERENCES questions(id) ON DELETE CASCADE,
        mistake_type TEXT NOT NULL,
        notes TEXT,
        stage TEXT DEFAULT 'STAGE_1_DAY',
        next_review_at TIMESTAMP WITH TIME ZONE NOT NULL,
        is_resolved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS mock_exams (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        section TEXT NOT NULL,
        score INTEGER NOT NULL,
        math_score INTEGER,
        reading_score INTEGER,
        total_questions INTEGER NOT NULL,
        correct_count INTEGER NOT NULL,
        time_spent INTEGER NOT NULL,
        completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 2. Load all 28 topics from OFFICIAL_TOPICS_DATA
    const currModule = await import("../src/lib/curriculum-data.ts");
    const topicsMap = currModule.OFFICIAL_TOPICS_DATA || {};
    const topicsList = Object.values(topicsMap);
    console.log(`Seeding/Updating ${topicsList.length} Official Curriculum Topics with Formulas & Desmos Bypasses...`);

    for (let i = 0; i < topicsList.length; i++) {
      const t = topicsList[i];
      const desmosTips = t.desmosBypass ? `${t.desmosBypass.title}: ${t.desmosBypass.keystrokes} - ${t.desmosBypass.explanation}` : null;
      await client.query(
        `INSERT INTO topics (id, section, domain, code, title_uz, title_en, description_uz, desmos_tips, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (code) DO UPDATE SET
           title_uz = EXCLUDED.title_uz,
           title_en = EXCLUDED.title_en,
           description_uz = EXCLUDED.description_uz,
           desmos_tips = EXCLUDED.desmos_tips,
           domain = EXCLUDED.domain,
           section = EXCLUDED.section,
           sort_order = EXCLUDED.sort_order;`,
        [
          `topic_${t.code.toLowerCase().replace(/[^a-z0-9]/g, "_")}`,
          t.section,
          t.domain,
          t.code,
          t.title_uz,
          t.title_en,
          t.description_uz,
          desmosTips,
          i + 1
        ]
      );
    }
    console.log("✅ All 28 Topics updated successfully with formulas and bypasses!");

    // Helper to insert questions safely
    const insertQuestions = async (questionsList, batchName) => {
      console.log(`📥 Seeding ${batchName} (${questionsList.length} questions)...`);
      let count = 0;
      for (const q of questionsList) {
        // Ensure options is JSON string
        let opts = q.options;
        if (typeof opts !== "string") {
          opts = JSON.stringify(opts);
        }

        await client.query(
          `INSERT INTO questions (
            id, topic_code, section, domain, difficulty, prompt, passage,
            options, correct_answer, explanation_uz, explanation_en,
            desmos_trick, reference_formula
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          ON CONFLICT (id) DO UPDATE SET
            topic_code = EXCLUDED.topic_code,
            section = EXCLUDED.section,
            domain = EXCLUDED.domain,
            difficulty = EXCLUDED.difficulty,
            prompt = EXCLUDED.prompt,
            passage = EXCLUDED.passage,
            options = EXCLUDED.options,
            correct_answer = EXCLUDED.correct_answer,
            explanation_uz = EXCLUDED.explanation_uz,
            explanation_en = EXCLUDED.explanation_en,
            desmos_trick = EXCLUDED.desmos_trick,
            reference_formula = EXCLUDED.reference_formula;`,
          [
            q.id,
            q.topic_code || q.topicCode || "ALG-01",
            q.section,
            q.domain,
            q.difficulty,
            q.prompt,
            q.passage || null,
            opts,
            q.correct_answer || q.correctAnswer || "A",
            q.explanation_uz || q.explanationUz || "",
            q.explanation_en || q.explanationEn || "",
            q.desmos_trick || q.desmosTrick || null,
            q.reference_formula || q.referenceFormula || null
          ]
        );
        count++;
      }
      console.log(`   -> Successfully processed ${count} questions for ${batchName}`);
    };

    // Robust bracket-matching array extractor
    function extractArray(content, varNames) {
      for (const name of varNames) {
        const regex = new RegExp(`(?:const|let|var)\\s+${name}\\s*=\\s*\\[`);
        const match = content.match(regex);
        if (match) {
          const startIndex = match.index + match[0].length - 1;
          let depth = 0;
          let inString = false;
          let stringChar = '';
          let escape = false;

          for (let i = startIndex; i < content.length; i++) {
            const char = content[i];
            if (escape) {
              escape = false;
              continue;
            }
            if (char === '\\') {
              escape = true;
              continue;
            }
            if (inString) {
              if (char === stringChar) {
                inString = false;
              }
              continue;
            }
            if (char === '"' || char === "'" || char === '`') {
              inString = true;
              stringChar = char;
              continue;
            }
            if (char === '[') {
              depth++;
            } else if (char === ']') {
              depth--;
              if (depth === 0) {
                const arrayCode = content.slice(startIndex, i + 1);
                try {
                  const fn = new Function(`return ${arrayCode}`);
                  return fn();
                } catch (err) {
                  console.error(`Eval error for ${name}:`, err.message);
                  return null;
                }
              }
            }
          }
        }
      }
      return null;
    }

    // 3. Extract and seed questions from all 12 files
    const seedFiles = [
      { relPath: "./seed-complete-sat-bank.mjs", vars: ["questions", "questionsData"] },
      { relPath: "./seed-batch2-master-bank.mjs", vars: ["batch2Questions", "questions"] },
      { relPath: "./seed-reading-writing-batch.mjs", vars: ["rwQuestions", "questions"] },
      { relPath: "./seed-adaptive-ecosystem-bank.mjs", vars: ["newQuestions", "questions"] },
      { relPath: "./seed-batch3-master-bank.mjs", vars: ["batch3Questions", "questions"] },
      { relPath: "./seed-batch4-final.mjs", vars: ["batch4", "questions"] },
      { relPath: "./seed-master-bank-enrichment.mjs", vars: ["questions", "enrichmentQuestions"] },
      { relPath: "./seed-satashkent-bank.mjs", vars: ["satashkentQuestions", "questions"] },
      { relPath: "./seed-satashkent-batch2.mjs", vars: ["batch2Questions", "questions"] },
      { relPath: "./add-more-verbal-questions.mjs", vars: ["extraQuestions", "questions"] },
      { relPath: "./seed-master-bank.mjs", vars: ["questionsData", "masterQuestions", "questions"] },
      { relPath: "./seed-pg.mjs", vars: ["questionsData", "questions"] }
    ];

    const fs = await import("fs");
    const path = await import("path");

    for (const item of seedFiles) {
      try {
        const fullPath = path.resolve("scripts", item.relPath);
        if (fs.existsSync(fullPath)) {
          const content = fs.readFileSync(fullPath, "utf8");
          const qs = extractArray(content, item.vars);
          if (qs && Array.isArray(qs)) {
            await insertQuestions(qs, path.basename(item.relPath));
          } else {
            console.log(`⚠️ Could not extract array in ${item.relPath}`);
          }
        }
      } catch (err) {
        console.error(`Error loading questions from ${item.relPath}:`, err.message);
      }
    }

    // 4. Verify total question count
    const qCountRes = await client.query("SELECT COUNT(*) FROM questions;");
    const tCountRes = await client.query("SELECT COUNT(*) FROM topics;");
    console.log("==================================================================");
    console.log(`🎉 Neon Database Seeding Completed!`);
    console.log(`Total Topics in Neon: ${tCountRes.rows[0].count}`);
    console.log(`Total High-Yield Questions in Neon: ${qCountRes.rows[0].count}`);
    console.log("==================================================================");

  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error("Fatal Seeding Error:", err);
  process.exit(1);
});
