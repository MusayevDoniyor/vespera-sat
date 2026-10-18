const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'src', 'lib', 'bluebook-exams-data.json');
const exams = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

function splitRwQuestion(q) {
  if (q.passage && q.passage.trim().length > 0) {
    return { passage: q.passage.trim(), prompt: q.prompt.trim(), method: 'already_split' };
  }

  const text = (q.prompt || '').trim();

  // Pattern 1: Student / Researcher notes
  const studentMatch = text.match(/\n?(The (?:student|researcher) wants to[\s\S]*?(?:Which|What)[\s\S]*?\?)\s*$/i);
  if (studentMatch && studentMatch.index !== undefined) {
    const passage = text.substring(0, studentMatch.index).trim();
    const prompt = studentMatch[1].trim();
    if (passage.length > 0 && prompt.length > 0) {
      return { passage, prompt, method: 'studentNotes' };
    }
  }

  // Pattern 2: Standard question stems near end of text
  const stemPatterns = [
    /\n\s*((?:Which|What) choice completes the text with the most logical transition\?)\s*$/i,
    /\n\s*((?:Which|What) choice completes the text with the most logical and precise word or phrase\?)\s*$/i,
    /\n\s*((?:Which|What) choice completes the text so that it conforms to the conventions of Standard English\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the function of[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the overall structure[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best states the main (?:idea|purpose)[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice best summarizes the text\?)\s*$/i,
    /\n\s*((?:Which|What) choice best describes the relationship[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice most effectively uses data from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice most effectively uses information from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) finding(?:, if true,)? would most (?:strongly|directly) (?:support|weaken)[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) finding from the [^\n\?]+, if true, would most (?:strongly|directly) (?:support|weaken)[\s\S]*?\?)\s*$/i,
    /\n\s*(As used in the text, (?:what|which) does the word[\s\S]*?\?)\s*$/i,
    /\n\s*(Based on the texts?,[\s\S]*?\?)\s*$/i,
    /\n\s*(According to the text,[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) quotation from[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) choice[\s\S]*?\?)\s*$/i,
    /\n\s*(What does the text most strongly suggest[\s\S]*?\?)\s*$/i,
    /\n\s*((?:Which|What) [^\n\?]+\?)\s*$/i,
  ];

  for (const pat of stemPatterns) {
    const match = text.match(pat);
    if (match && match.index !== undefined) {
      const passage = text.substring(0, match.index).trim();
      const prompt = match[1].trim();
      if (passage.length > 0 && prompt.length > 0) {
        return { passage, prompt, method: 'stemPatterns' };
      }
    }
  }

  // Pattern 3: Text with blank (______) but no explicit question stem
  if (text.includes('______') || text.includes('_______')) {
    const isTransition = (q.options || []).some(o => /^(A\s+)?(However|Therefore|Furthermore|Consequently|In addition|Previously|Meanwhile|For example|Thus|Similarly)/i.test(o));
    const stem = isTransition
      ? 'Which choice completes the text with the most logical transition?'
      : 'Which choice completes the text so that it conforms to the conventions of Standard English?';
    return { passage: text, prompt: stem, method: 'blankInference' };
  }

  // Pattern 4: Fallback to last question sentence
  const lastQMark = text.lastIndexOf('?');
  if (lastQMark !== -1) {
    const prevNewline = text.lastIndexOf('\n', lastQMark);
    if (prevNewline !== -1) {
      const passage = text.substring(0, prevNewline).trim();
      const prompt = text.substring(prevNewline).trim();
      if (passage.length > 0 && prompt.length > 0) {
        return { passage, prompt, method: 'lastNewlineQ' };
      }
    }
  }

  return { passage: text, prompt: 'Which choice best answers the question based on the text?', method: 'fallback' };
}

let modifiedCount = 0;
const rwKeys = ['rwModule1', 'rwModule2Hard', 'rwModule2Easy'];

exams.forEach(exam => {
  rwKeys.forEach(k => {
    (exam[k] || []).forEach(q => {
      const res = splitRwQuestion(q);
      if (res.method !== 'already_split') {
        q.passage = res.passage;
        q.prompt = res.prompt;
        modifiedCount++;
      }
    });
  });
});

fs.writeFileSync(dataFilePath, JSON.stringify(exams, null, 2), 'utf8');

console.log(`Successfully split passages for ${modifiedCount} Reading & Writing questions!`);
