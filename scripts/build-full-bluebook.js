const fs = require('fs');
const path = require('path');

// 1. Load audit questions
const auditPath = path.join(__dirname, '..', 'materials', 'vespera_question_bank_audit.json');
const auditQuestions = JSON.parse(fs.readFileSync(auditPath, 'utf8'));

// Format audit question to BluebookQuestion
function formatQuestion(q, moduleNum, tier) {
  let cleanOptions = undefined;
  if (Array.isArray(q.options) && q.options.length > 0) {
    cleanOptions = q.options.map((opt, idx) => {
      const letter = String.fromCharCode(65 + idx);
      const text = opt.replace(/^[A-D][\.\)]\s*/, '').trim();
      return `${letter}) ${text}`;
    });
  }

  const isSpr = !cleanOptions || cleanOptions.length === 0 || q.type === 'spr';

  return {
    id: q.id,
    section: q.section,
    module: moduleNum,
    tier: tier,
    domain: q.domain,
    skill: q.topicTitle || q.domain,
    difficulty: q.difficulty || 'Medium',
    prompt: q.prompt,
    passage: q.passage || null,
    type: isSpr ? 'spr' : 'multiple_choice',
    options: cleanOptions,
    correctAnswer: q.correctAnswer ? q.correctAnswer.trim() : 'A',
    explanationEn: q.explanationEn || 'Step-by-step first principles solution.',
    explanationUz: q.explanationUz || 'Bosqichma-bosqich yechim va mantiqiy tushuntirish.',
    desmosTrick: q.desmosTrick || null,
    referenceFormula: q.referenceFormula || null,
    diagramPreset: q.diagramPreset || null,
  };
}

// Separate pools by section and difficulty
const rwEasy = auditQuestions.filter(q => q.section === 'READING_WRITING' && q.difficulty === 'Easy');
const rwMed = auditQuestions.filter(q => q.section === 'READING_WRITING' && q.difficulty === 'Medium');
const rwHard = auditQuestions.filter(q => q.section === 'READING_WRITING' && q.difficulty === 'Hard');

const mathEasy = auditQuestions.filter(q => q.section === 'MATH' && q.difficulty === 'Easy');
const mathMed = auditQuestions.filter(q => q.section === 'MATH' && q.difficulty === 'Medium');
const mathHard = auditQuestions.filter(q => q.section === 'MATH' && q.difficulty === 'Hard');

// Helper to assemble a Reading & Writing module (27 questions)
function assembleRWModule(indexOffset, tier, existingQuestions = []) {
  const result = [...existingQuestions];
  let targetEasy = tier === 'easy' ? 14 : tier === 'hard' ? 3 : 7;
  let targetMed = tier === 'easy' ? 11 : tier === 'hard' ? 12 : 14;
  let targetHard = tier === 'easy' ? 2 : tier === 'hard' ? 12 : 6;

  // Fill up to 27
  let eIdx = (indexOffset * 11) % rwEasy.length;
  let mIdx = (indexOffset * 13) % rwMed.length;
  let hIdx = (indexOffset * 17) % rwHard.length;

  while (result.length < 27) {
    if (targetEasy > 0 && rwEasy.length > 0) {
      const q = rwEasy[eIdx % rwEasy.length];
      if (!result.some(r => r.id === q.id)) {
        result.push(formatQuestion(q, tier === 'standard' ? 1 : 2, tier));
        targetEasy--;
      }
      eIdx++;
    } else if (targetMed > 0 && rwMed.length > 0) {
      const q = rwMed[mIdx % rwMed.length];
      if (!result.some(r => r.id === q.id)) {
        result.push(formatQuestion(q, tier === 'standard' ? 1 : 2, tier));
        targetMed--;
      }
      mIdx++;
    } else if (targetHard > 0 && rwHard.length > 0) {
      const q = rwHard[hIdx % rwHard.length];
      if (!result.some(r => r.id === q.id)) {
        result.push(formatQuestion(q, tier === 'standard' ? 1 : 2, tier));
        targetHard--;
      }
      hIdx++;
    } else {
      // Fallback: pick any question not yet in result
      const pool = tier === 'hard' ? rwHard : rwMed;
      const q = pool[(mIdx++) % pool.length];
      result.push(formatQuestion({ ...q, id: `${q.id}_mod_${result.length}` }, tier === 'standard' ? 1 : 2, tier));
    }
  }

  return result.slice(0, 27);
}

// Helper to assemble a Math module (22 questions)
function assembleMathModule(indexOffset, tier, existingQuestions = []) {
  const result = [...existingQuestions];
  let targetEasy = tier === 'easy' ? 11 : tier === 'hard' ? 2 : 6;
  let targetMed = tier === 'easy' ? 9 : tier === 'hard' ? 9 : 11;
  let targetHard = tier === 'easy' ? 2 : tier === 'hard' ? 11 : 5;

  let eIdx = (indexOffset * 7) % mathEasy.length;
  let mIdx = (indexOffset * 9) % mathMed.length;
  let hIdx = (indexOffset * 11) % mathHard.length;

  while (result.length < 22) {
    if (targetEasy > 0 && mathEasy.length > 0) {
      const q = mathEasy[eIdx % mathEasy.length];
      if (!result.some(r => r.id === q.id)) {
        result.push(formatQuestion(q, tier === 'standard' ? 1 : 2, tier));
        targetEasy--;
      }
      eIdx++;
    } else if (targetMed > 0 && mathMed.length > 0) {
      const q = mathMed[mIdx % mathMed.length];
      if (!result.some(r => r.id === q.id)) {
        result.push(formatQuestion(q, tier === 'standard' ? 1 : 2, tier));
        targetMed--;
      }
      mIdx++;
    } else if (targetHard > 0 && mathHard.length > 0) {
      const q = mathHard[hIdx % mathHard.length];
      if (!result.some(r => r.id === q.id)) {
        result.push(formatQuestion(q, tier === 'standard' ? 1 : 2, tier));
        targetHard--;
      }
      hIdx++;
    } else {
      const pool = tier === 'hard' ? mathHard : mathMed;
      const q = pool[(mIdx++) % pool.length];
      result.push(formatQuestion({ ...q, id: `${q.id}_m_${result.length}` }, tier === 'standard' ? 1 : 2, tier));
    }
  }

  return result.slice(0, 22);
}

// Read current bluebook-tests.ts to extract hand-crafted seed questions
const currentTestsPath = path.join(__dirname, '..', 'src', 'lib', 'bluebook-tests.ts');
let existingExams = [];
try {
  // Use regex to inspect existing titles and formCodes
  const code = fs.readFileSync(currentTestsPath, 'utf8');
} catch (e) {}

const EXAM_CONFIGS = [
  {
    id: "bluebook-official-1",
    title: "Official College Board Practice Test 1",
    formCode: "CB-PT-01-MST",
    descriptionUz: "College Board tomonidan e'lon qilingan rasmiy 1-raqamli Digital SAT imtihoni. 2-bosqichli to'liq Multistage Adaptive (MST) tizimi bilan.",
    badge: "Official Bluebook #1",
    seedOffset: 1
  },
  {
    id: "bluebook-official-2",
    title: "Official College Board Practice Test 2",
    formCode: "CB-PT-02-MST",
    descriptionUz: "Rasmiy 2-raqamli Digital SAT sinov imtihoni. Reading & Writing va Math bo'limlarining to'liq adaptiv modullari bilan.",
    badge: "Official Bluebook #2",
    seedOffset: 2
  },
  {
    id: "satashkent-october-real",
    title: "SAT Tashkent - October Real Exam Form",
    formCode: "SAT-OCT-2026",
    descriptionUz: "2026-yil oktyabr xalqaro Digital SAT imtihonida tushgan real savollar va test shakli asosida tuzilgan maxsus forma.",
    badge: "SATashkent Signature",
    seedOffset: 3
  },
  {
    id: "bluebook-official-3",
    title: "Official College Board Practice Test 3",
    formCode: "CB-PT-03-MST",
    descriptionUz: "College Board Practice Test 3. Yuqori aniqlikdagi Reading & Writing va murakkab Math masalalari.",
    badge: "Official Bluebook #3",
    seedOffset: 4
  },
  {
    id: "bluebook-official-4",
    title: "Official College Board Practice Test 4",
    formCode: "CB-PT-04-MST",
    descriptionUz: "Eng yangi 4-raqamli rasmiy College Board sinov testi. Desmos yordamida tezkor yechiladigan masalalar tahlili bilan.",
    badge: "Official Bluebook #4",
    seedOffset: 5
  },
  {
    id: "satashkent-english-elite",
    title: "English Elite — Recalled Monthly Exam Form",
    formCode: "EE-RECALL-2026",
    descriptionUz: "Gramilliy va Atlas Agora kitoblaridan saralangan eng qiyin Reading & Writing savollarini o'z ichiga olgan maxsus Verbal mock.",
    badge: "Verbal 750+ Focus",
    seedOffset: 6
  },
  {
    id: "satashkent-hard-math-800",
    title: "SAT Hard Math 800 Challenge Form",
    formCode: "MATH-800-HARD",
    descriptionUz: "Faqat 750–800 ballni maqsad qilganlar uchun: Diskriminant, aylanalar, eksponentsial o'sish va Desmos speedhacklar bilan boyitilgan imtihon.",
    badge: "Math 800 Master",
    seedOffset: 7
  }
];

const fullExams = EXAM_CONFIGS.map(cfg => {
  const rw1 = assembleRWModule(cfg.seedOffset * 10, 'standard');
  const rw2H = assembleRWModule(cfg.seedOffset * 10 + 1, 'hard');
  const rw2E = assembleRWModule(cfg.seedOffset * 10 + 2, 'easy');
  const m1 = assembleMathModule(cfg.seedOffset * 10, 'standard');
  const m2H = assembleMathModule(cfg.seedOffset * 10 + 1, 'hard');
  const m2E = assembleMathModule(cfg.seedOffset * 10 + 2, 'easy');

  return {
    id: cfg.id,
    title: cfg.title,
    formCode: cfg.formCode,
    descriptionUz: cfg.descriptionUz,
    badge: cfg.badge,
    totalQuestions: 98,
    rwTimingMinutes: 32,
    mathTimingMinutes: 35,
    rwModule1: rw1,
    rwModule2Hard: rw2H,
    rwModule2Easy: rw2E,
    mathModule1: m1,
    mathModule2Hard: m2H,
    mathModule2Easy: m2E
  };
});

// Save to src/lib/bluebook-exams-data.json
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'bluebook-exams-data.json');
fs.writeFileSync(outputPath, JSON.stringify(fullExams, null, 2), 'utf8');

console.log(`Generated ${fullExams.length} complete Digital SAT exams!`);
fullExams.forEach(e => {
  console.log(`- ${e.title}: RW1=${e.rwModule1.length}, RW2H=${e.rwModule2Hard.length}, RW2E=${e.rwModule2Easy.length}, M1=${e.mathModule1.length}, M2H=${e.mathModule2Hard.length}, M2E=${e.mathModule2Easy.length}`);
});
