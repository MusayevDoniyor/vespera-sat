import fs from 'fs';
import path from 'path';

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

const files = [
  { file: 'scripts/seed-complete-sat-bank.mjs', vars: ['questions', 'questionsData'] },
  { file: 'scripts/seed-batch2-master-bank.mjs', vars: ['batch2Questions', 'questions'] },
  { file: 'scripts/seed-reading-writing-batch.mjs', vars: ['rwQuestions', 'questions'] },
  { file: 'scripts/seed-adaptive-ecosystem-bank.mjs', vars: ['newQuestions', 'questions'] },
  { file: 'scripts/seed-batch3-master-bank.mjs', vars: ['batch3Questions', 'questions'] },
  { file: 'scripts/seed-batch4-final.mjs', vars: ['batch4', 'questions'] },
  { file: 'scripts/seed-master-bank-enrichment.mjs', vars: ['questions', 'enrichmentQuestions'] },
  { file: 'scripts/seed-satashkent-bank.mjs', vars: ['satashkentQuestions', 'questions'] },
  { file: 'scripts/seed-satashkent-batch2.mjs', vars: ['batch2Questions', 'questions'] },
  { file: 'scripts/add-more-verbal-questions.mjs', vars: ['extraQuestions', 'questions'] },
  { file: 'scripts/seed-master-bank.mjs', vars: ['questionsData', 'masterQuestions', 'questions'] },
  { file: 'scripts/seed-pg.mjs', vars: ['questionsData', 'questions'] }
];

let totalExtracted = 0;
const uniqueIds = new Set();

for (const f of files) {
  if (fs.existsSync(f.file)) {
    const content = fs.readFileSync(f.file, 'utf8');
    const qs = extractArray(content, f.vars);
    if (qs && Array.isArray(qs)) {
      console.log(`✅ ${f.file}: successfully extracted ${qs.length} questions`);
      totalExtracted += qs.length;
      qs.forEach(q => uniqueIds.add(q.id));
    } else {
      console.log(`❌ ${f.file}: FAILED to extract`);
    }
  }
}

console.log(`\nTotal questions parsed across files: ${totalExtracted}`);
console.log(`Unique question IDs: ${uniqueIds.size}`);

const usedCodes = new Set();
for (const f of files) {
  if (fs.existsSync(f.file)) {
    const content = fs.readFileSync(f.file, 'utf8');
    const qs = extractArray(content, f.vars);
    if (qs) {
      qs.forEach(q => {
        const code = q.topic_code || q.topicCode || 'NONE';
        usedCodes.add(code);
      });
    }
  }
}
console.log(`Topic codes used in questions (${usedCodes.size}):`, Array.from(usedCodes).sort().join(', '));
