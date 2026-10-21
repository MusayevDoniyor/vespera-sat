import fs from 'fs';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Error: DATABASE_URL environment variable is required.");
  process.exit(1);
}

const pool = new Pool({ connectionString });

function parseAllQuestions() {
  const filePath = 'scripts/extracted/_SAT_Top_SQB_english_with_answers_pdf.txt';
  const content = fs.readFileSync(filePath, 'utf8');
  const chunks = content.split(/\n(?=Question ID [a-f0-9]+)/);
  const questions = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const idMatch = chunk.match(/^Question ID ([a-f0-9]+)/);
    if (!idMatch) continue;
    const rawId = idMatch[1];
    const id = `cb_${rawId}`;

    const ansMatch = chunk.match(/Correct Answer:\s*([A-D])/);
    if (!ansMatch) continue;
    const correctAnswer = ansMatch[1];

    const diffMatch = chunk.match(/Question Dif[\s\S]{0,3}culty:\s*(Easy|Medium|Hard)/i);
    const difficulty = diffMatch
      ? diffMatch[1].charAt(0).toUpperCase() + diffMatch[1].slice(1).toLowerCase()
      : 'Medium';

    const skillMatch = chunk.match(/Skill\s*\n\s*([^\n\r]+)/);
    const rawSkill = skillMatch ? skillMatch[1].trim() : '';

    const domainMatch = chunk.match(/Domain\s*\n\s*([^\n\r]+(?:\n[^\n\r]+)?)/);
    let domain = 'Information and Ideas';
    if (domainMatch) {
      const rawDom = domainMatch[1].replace(/\s+/g, ' ').trim();
      if (rawDom.includes('Craft')) domain = 'Craft and Structure';
      else if (rawDom.includes('Expression')) domain = 'Expression of Ideas';
      else if (rawDom.includes('Standard English') || rawDom.includes('Conventions')) domain = 'Standard English Conventions';
      else if (rawDom.includes('Information')) domain = 'Information and Ideas';
    }

    let topicCode = 'ENG-CID';
    const lowerSkill = rawSkill.toLowerCase();
    if (lowerSkill.includes('inference')) topicCode = 'ENG-INF';
    else if (lowerSkill.includes('central idea') || lowerSkill.includes('detail')) topicCode = 'ENG-CID';
    else if (lowerSkill.includes('command of evidence') || lowerSkill.includes('evidence')) topicCode = 'ENG-COE';
    else if (lowerSkill.includes('words in context') || lowerSkill.includes('vocabulary')) topicCode = 'ENG-WIC';
    else if (lowerSkill.includes('text structure') || lowerSkill.includes('purpose')) topicCode = 'ENG-PUR';
    else if (lowerSkill.includes('cross-text')) topicCode = 'ENG-CRO';
    else if (lowerSkill.includes('rhetorical') || lowerSkill.includes('synthesis')) topicCode = 'ENG-SYN';
    else if (lowerSkill.includes('transition')) topicCode = 'ENG-TRA';
    else if (lowerSkill.includes('boundar')) topicCode = 'ENG-BOU';
    else if (lowerSkill.includes('form') || lowerSkill.includes('sense') || lowerSkill.includes('agreement')) topicCode = 'ENG-AGR';

    const answerRegex = new RegExp(`(?:ID:\\s*${rawId}\\s*Answer|Correct Answer:)`);
    const answerSplit = chunk.split(answerRegex);
    const questionPart = answerSplit[0];
    const answerPart = chunk.slice(questionPart.length);

    const optAIndex = questionPart.lastIndexOf('\nA. ');
    if (optAIndex === -1) continue;

    const optBIndex = questionPart.indexOf('\nB. ', optAIndex);
    const optCIndex = questionPart.indexOf('\nC. ', optBIndex);
    const optDIndex = questionPart.indexOf('\nD. ', optCIndex);

    if (optBIndex === -1 || optCIndex === -1 || optDIndex === -1) continue;

    const passageAndPrompt = questionPart.slice(0, optAIndex).replace(/^Question ID [a-f0-9]+\s+ID:\s*[a-f0-9]+\s*/, '').trim();
    const optA = questionPart.slice(optAIndex + 1, optBIndex).trim();
    const optB = questionPart.slice(optBIndex + 1, optCIndex).trim();
    const optC = questionPart.slice(optCIndex + 1, optDIndex).trim();
    const optD = questionPart.slice(optDIndex + 1).trim();

    let rationale = '';
    const ratMatch = answerPart.match(/Rationale([\s\S]*)/);
    if (ratMatch) {
      rationale = ratMatch[1]
        .replace(/Assessment\s+SAT\s+Test\s+Reading and Writing[\s\S]*?Difficulty/g, '')
        .replace(/Question Dif[\s\S]{0,3}culty:\s*(Easy|Medium|Hard)/gi, '')
        .replace(/--\s*\d+\s*of\s*\d+\s*--/g, '')
        .trim();
    }

    let uzbekTopicNote = "Matn tahlili va to'g'ri mantiqiy xulosa.";
    if (topicCode === 'ENG-WIC') uzbekTopicNote = "Kontekstdagi akademik so'z ma'nosi va sinonimini aniqlash.";
    else if (topicCode === 'ENG-TRA') uzbekTopicNote = "Gaplar orasidagi mantiqiy bog'lovchini (contrast, addition, cause-effect) tanlash.";
    else if (topicCode === 'ENG-BOU') uzbekTopicNote = "Gap chegaralari: nuqtali vergul (;), vergul va bog'lovchilar qoidasi.";
    else if (topicCode === 'ENG-SYN') uzbekTopicNote = "Qaydlar (bullet points) asosida maqsadga mos jumlani sintez qilish.";
    else if (topicCode === 'ENG-COE') uzbekTopicNote = "Ilmiy gipotezani tasdiqlovchi yoki inkor etuvchi faktik dalilni topish.";
    else if (topicCode === 'ENG-INF') uzbekTopicNote = "Matndagi dalillardan bevosita kelib chiqadigan qat'iy mantiqiy xulosa.";

    const cleanText = (str) => (str ? str.replace(/\0/g, '').trim() : '');

    const finalPrompt = cleanText(passageAndPrompt);
    const finalRationale = cleanText(rationale);
    const finalOptA = cleanText(optA);
    const finalOptB = cleanText(optB);
    const finalOptC = cleanText(optC);
    const finalOptD = cleanText(optD);

    const explanation_uz = `💡 RASMIY COLLEGE BOARD TAHLILI:\nTo'g'ri javob: ${correctAnswer}.\n${uzbekTopicNote}\n\nInglizcha to'liq izoh: ${finalRationale.slice(0, 300)}...`;

    questions.push({
      id,
      topic_code: topicCode,
      section: 'READING_WRITING',
      domain,
      difficulty,
      prompt: finalPrompt,
      passage: null,
      options: JSON.stringify([finalOptA, finalOptB, finalOptC, finalOptD]),
      correct_answer: correctAnswer,
      explanation_uz: cleanText(explanation_uz),
      explanation_en: finalRationale,
      desmos_trick: null,
      reference_formula: `Domain: ${domain} | Skill: ${rawSkill}`
    });
  }

  return questions;
}

async function main() {
  console.log("Parsing College Board Suite Question Bank English questions...");
  const questions = parseAllQuestions();
  console.log(`Successfully extracted ${questions.length} authentic College Board questions.`);

  const client = await pool.connect();
  try {
    console.log("Connecting to PostgreSQL Neon database...");
    await client.query("SET search_path TO vespera, public;");

    console.log("Beginning database transaction...");
    await client.query("BEGIN;");

    const insertQuery = `
      INSERT INTO vespera.questions (
        id, topic_code, section, domain, difficulty, prompt, passage, options,
        correct_answer, explanation_uz, explanation_en, desmos_trick, reference_formula, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
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
        reference_formula = EXCLUDED.reference_formula;
    `;

    let inserted = 0;
    for (const q of questions) {
      await client.query(insertQuery, [
        q.id,
        q.topic_code,
        q.section,
        q.domain,
        q.difficulty,
        q.prompt,
        q.passage,
        q.options,
        q.correct_answer,
        q.explanation_uz,
        q.explanation_en,
        q.desmos_trick,
        q.reference_formula
      ]);
      inserted++;
      if (inserted % 100 === 0) {
        console.log(`Seeded ${inserted} / ${questions.length} questions...`);
      }
    }

    await client.query("COMMIT;");
    console.log(`✅ SUCCESS: Fully seeded all ${inserted} authentic College Board questions into PostgreSQL!`);

    const countRes = await client.query("SELECT count(*) FROM vespera.questions;");
    const domainCounts = await client.query("SELECT domain, count(*) FROM vespera.questions GROUP BY domain ORDER BY count DESC;");
    console.log(`\n🎉 New Total Question Bank Count: ${countRes.rows[0].count} questions!`);
    console.table(domainCounts.rows);

  } catch (err) {
    await client.query("ROLLBACK;");
    console.error("Database seed error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
