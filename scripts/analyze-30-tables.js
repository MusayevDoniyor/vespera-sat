const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('scripts/extracted_30_table_questions.json', 'utf8'));

console.log('Analyzing 30 table/chart questions:');
for (const q of questions) {
  const p = q.passage || '';
  const lines = p.split('\n').map(l => l.trim()).filter(Boolean);
  const first3 = lines.slice(0, 4);
  const isNumericLeader = /^[0-9,.]+$/.test(first3[0] || '');
  console.log(`\n----------------- ${q.id} (${isNumericLeader ? 'CHART/GRAPH' : 'DATA TABLE'}) -----------------`);
  console.log('Prompt:', q.prompt);
  console.log('First 4 lines of passage:');
  first3.forEach(l => console.log('  >', l));
}
