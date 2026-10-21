const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('scripts/extracted_30_table_questions.json', 'utf8'));

const tableIds = [
  'cb_24c1b7e4', 'cb_014b3394', 'cb_01c1d9ee', 'cb_0b96fa93', 'cb_145da981',
  'cb_38e79659', 'cb_4042ff0b', 'cb_46e45728', 'cb_5ff1ba73', 'cb_75e07a4d',
  'cb_9debe79a', 'cb_b2e54b50', 'cb_c4bee178', 'cb_cbecb873', 'cb_ccf414c9',
  'cb_cf7491c1', 'cb_d102706f', 'cb_df9c5a1d', 'cb_f452410b', 'cb_faaf484f'
];

const tables = questions.filter(q => tableIds.includes(q.id));
let out = '';
for (const t of tables) {
  out += `\n======================================================\n`;
  out += `ID: ${t.id}\n`;
  out += `PROMPT: ${t.prompt}\n`;
  out += `PASSAGE:\n${t.passage}\n`;
}

fs.writeFileSync('scripts/dump-20-tables-utf8.txt', out, 'utf8');
console.log('Saved dump-20-tables-utf8.txt');
