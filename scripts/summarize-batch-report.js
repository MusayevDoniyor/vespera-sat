const fs = require('fs');
const report = JSON.parse(fs.readFileSync('materials/batch_audit_report.json', 'utf8'));

report.forEach(b => {
  console.log(`\n========================================`);
  console.log(`BATCH ${b.batch} (Questions ${b.range})`);
  console.log(`========================================`);
  console.log(`Total questions in batch: ${b.total}`);
  console.log(`Questions modified & repaired: ${b.fixedQuestions.length}`);

  const fixTypes = {};
  b.fixedQuestions.forEach(q => {
    q.fixes.forEach(f => {
      fixTypes[f] = (fixTypes[f] || 0) + 1;
    });
  });
  console.log('Fixes breakdown:');
  Object.entries(fixTypes).forEach(([type, count]) => {
    console.log(`  • ${type}: ${count}`);
  });

  if (b.fixedQuestions.length > 0) {
    console.log('Notable fixed questions:');
    b.fixedQuestions.slice(0, 3).forEach(q => {
      console.log(`  - #${q.qNum} (${q.id}) [${q.section} | ${q.domain}]: ${q.fixes.join('; ')}`);
    });
  }
});
