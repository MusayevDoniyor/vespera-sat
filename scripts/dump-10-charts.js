const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('scripts/extracted_30_table_questions.json', 'utf8'));

const chartIds = [
  'cb_02848335', 'cb_1703403b', 'cb_30c3aa98', 'cb_37a49687', 'cb_5d453dcc',
  'cb_8af28416', 'cb_be19faa1', 'cb_ccb1ab92', 'cb_d5b9ed0d', 'cb_e441da80'
];

const charts = questions.filter(q => chartIds.includes(q.id));
let out = '';
for (const c of charts) {
  out += `\n======================================================\n`;
  out += `ID: ${c.id}\n`;
  out += `PROMPT: ${c.prompt}\n`;
  out += `OPTIONS: ${c.options}\n`;
  out += `CORRECT: ${c.correct_answer}\n`;
  out += `EXPLANATION: ${c.explanation_en}\n`;
  out += `FULL PASSAGE:\n${c.passage}\n`;
}

fs.writeFileSync('scripts/dump-10-charts-utf8.txt', out, 'utf8');
console.log('Saved dump-10-charts-utf8.txt');
