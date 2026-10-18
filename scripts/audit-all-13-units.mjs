import { KHAN_FULL_UNITS, getAllKhanUnitIds, getKhanFullUnit } from '../src/lib/khan-textbook-units.js';

console.log("Auditing all 13 Khan Academy Textbook Units...");

const unitIds = getAllKhanUnitIds();
console.log(`Discovered ${unitIds.length} Unit IDs registered.`);

let totalSections = 0;
let totalQuestions = 0;
let errors = [];

unitIds.forEach((uid, uIdx) => {
  const unit = getKhanFullUnit(uid);
  if (!unit) {
    errors.push(`Unit ${uid} returned null from getKhanFullUnit!`);
    return;
  }

  const sectionsCount = unit.sections?.length || 0;
  const questionsCount = unit.practiceQuestions?.length || 0;
  totalSections += sectionsCount;
  totalQuestions += questionsCount;

  console.log(`\n[Unit ${unit.unitNumber}] ${unit.title} (${unit.tier})`);
  console.log(`  - Domain: ${unit.domain} | Topic: ${unit.topicCode} | Hours: ${unit.estimatedHours}`);
  console.log(`  - Sections: ${sectionsCount}`);
  console.log(`  - Speed Hacks: ${unit.speedHacks?.length || 0}`);
  console.log(`  - Practice Questions: ${questionsCount}`);

  // Check section completeness
  unit.sections.forEach((sec, sIdx) => {
    if (!sec.title || sec.title.trim() === '') errors.push(`Unit ${uid} Sec ${sIdx + 1} missing title`);
    if (!sec.summary || sec.summary.trim() === '') errors.push(`Unit ${uid} Sec ${sIdx + 1} missing summary`);
    if (!sec.contentMarkdown || sec.contentMarkdown.length < 50) errors.push(`Unit ${uid} Sec ${sIdx + 1} content too short`);
    if (!sec.keyTakeaways || sec.keyTakeaways.length < 2) errors.push(`Unit ${uid} Sec ${sIdx + 1} missing takeaways`);
  });

  // Check practice questions completeness
  if (questionsCount < 10) {
    errors.push(`Unit ${uid} has only ${questionsCount} practice questions (expected 10)`);
  }

  unit.practiceQuestions.forEach((q, qIdx) => {
    if (!q.prompt || q.prompt.length < 15) errors.push(`Unit ${uid} Q${qIdx + 1} prompt too short`);
    if (!q.options || q.options.length !== 4) errors.push(`Unit ${uid} Q${qIdx + 1} options length is ${q.options?.length} (expected 4)`);
    if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) errors.push(`Unit ${uid} Q${qIdx + 1} invalid correct answer: ${q.correctAnswer}`);
    if (!q.explanation || q.explanation.length < 20) errors.push(`Unit ${uid} Q${qIdx + 1} explanation too short`);
  });
});

console.log("\n=======================================================");
console.log("🎯 KHAN ACADEMY 13-UNIT CURRICULUM AUDIT SUMMARY");
console.log("=======================================================");
console.log(`Total Units Audited: ${unitIds.length}`);
console.log(`Total In-Depth Textbook Chapters/Sections: ${totalSections}`);
console.log(`Total Target Diagnostic Questions: ${totalQuestions}`);
console.log(`Integrity Errors / Incomplete Items: ${errors.length}`);

if (errors.length > 0) {
  console.log("\nErrors Found:");
  errors.forEach(e => console.log(` - ❌ ${e}`));
} else {
  console.log("\n✅ ALL 13 UNITS PASSED 100% QUALITY AND INTEGRITY CHECKS!");
}
