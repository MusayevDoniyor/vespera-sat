const fs = require('fs');
const exams = JSON.parse(fs.readFileSync('src/lib/bluebook-exams-data.json', 'utf8'));

exams.forEach(e => {
  ['rwModule1', 'rwModule2Hard', 'rwModule2Easy', 'mathModule1', 'mathModule2Hard', 'mathModule2Easy'].forEach(m => {
    (e[m] || []).forEach(q => {
      const fullText = (q.prompt || '') + ' ' + (q.passage || '');
      const noCode = fullText.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
      const dollars = (noCode.match(/(?<!\\)\$/g) || []).length;
      if (dollars % 2 !== 0) {
        console.log(`[${e.id} / ${m}] ID: ${q.id} (dollars: ${dollars})`);
        console.log(" Prompt:", q.prompt);
      }
    });
  });
});
