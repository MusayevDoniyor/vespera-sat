const fs = require('fs');
const qs = JSON.parse(fs.readFileSync('materials/all_questions_master.json', 'utf8'));
console.log('all_questions_master.json total count:', qs.length);
const math = qs.filter(q => q.section === 'MATH');
console.log('Math count:', math.length);
const rw = qs.filter(q => q.section === 'READING_WRITING');
console.log('Reading Writing count:', rw.length);
