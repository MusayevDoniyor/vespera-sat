import fs from 'fs';

const content = fs.readFileSync('scripts/extracted/_SAT_Top_SQB_english_with_answers_pdf.txt', 'utf8');
const chunks = content.split(/\n(?=Question ID [a-f0-9]+)/);

function parseChunk(chunk, index) {
  const idMatch = chunk.match(/^Question ID ([a-f0-9]+)/);
  if (!idMatch) return null;
  const id = idMatch[1];
  
  // Correct Answer
  const ansMatch = chunk.match(/Correct Answer:\s*([A-D])/);
  const correctAnswer = ansMatch ? ansMatch[1] : null;

  // Difficulty
  const diffMatch = chunk.match(/Question Dif[\s\S]{0,3}culty:\s*(Easy|Medium|Hard)/i);
  const difficulty = diffMatch ? (diffMatch[1].charAt(0).toUpperCase() + diffMatch[1].slice(1).toLowerCase()) : 'Medium';

  // Skill
  const skillMatch = chunk.match(/Skill\s*\n\s*([^\n\r]+)/);
  let rawSkill = skillMatch ? skillMatch[1].trim() : '';

  // Domain
  const domainMatch = chunk.match(/Domain\s*\n\s*([^\n\r]+(?:\n[^\n\r]+)?)/);
  let domain = 'Information and Ideas';
  if (domainMatch) {
    const rawDom = domainMatch[1].replace(/\s+/g, ' ').trim();
    if (rawDom.includes('Craft')) domain = 'Craft and Structure';
    else if (rawDom.includes('Expression')) domain = 'Expression of Ideas';
    else if (rawDom.includes('Standard English') || rawDom.includes('Conventions')) domain = 'Standard English Conventions';
    else if (rawDom.includes('Information')) domain = 'Information and Ideas';
  }

  // Map skill to topic_code
  let topicCode = 'ENG-CID';
  const lowerSkill = rawSkill.toLowerCase();
  if (lowerSkill.includes('inference')) topicCode = 'ENG-INF';
  else if (lowerSkill.includes('central idea') || lowerSkill.includes('detail')) topicCode = 'ENG-CID';
  else if (lowerSkill.includes('command of evidence') || lowerSkill.includes('evidence')) topicCode = 'ENG-COE';
  else if (lowerSkill.includes('words in context') || lowerSkill.includes('vocabulary')) topicCode = 'ENG-WIC';
  else if (lowerSkill.includes('text structure') || lowerSkill.includes('purpose')) topicCode = 'ENG-PUR';
  else if (lowerSkill.includes('cross-text')) topicCode = 'ENG-CRO';
  else if (lowerSkill.includes('rhetorical') || lowerSkill.includes('synthesis')) topicCode = 'ENG-SYN';
  else if (lowerSkill.includes('transition')) topicCode = 'ENG-TRA';
  else if (lowerSkill.includes('boundar')) topicCode = 'ENG-BOU';
  else if (lowerSkill.includes('form') || lowerSkill.includes('sense') || lowerSkill.includes('agreement')) topicCode = 'ENG-AGR';

  // Split before ID: <id> Answer or Correct Answer
  const answerRegex = new RegExp(`(?:ID:\\s*${id}\\s*Answer|Correct Answer:)`);
  const answerSplit = chunk.split(answerRegex);
  const questionPart = answerSplit[0];
  const answerPart = chunk.slice(questionPart.length);

  // In SAT RW, options A, B, C, D are located at the end of questionPart.
  // We can search backwards or find the last instance of '\nA. ' that is followed by '\nB. ', '\nC. ', '\nD. '.
  const optAIndex = questionPart.lastIndexOf('\nA. ');
  let optA = '', optB = '', optC = '', optD = '';
  let passageAndPrompt = '';

  if (optAIndex !== -1) {
    const optBIndex = questionPart.indexOf('\nB. ', optAIndex);
    const optCIndex = questionPart.indexOf('\nC. ', optBIndex);
    const optDIndex = questionPart.indexOf('\nD. ', optCIndex);

    if (optBIndex !== -1 && optCIndex !== -1 && optDIndex !== -1) {
      passageAndPrompt = questionPart.slice(0, optAIndex).replace(/^Question ID [a-f0-9]+\s+ID:\s*[a-f0-9]+\s*/, '').trim();
      optA = questionPart.slice(optAIndex + 1, optBIndex).trim();
      optB = questionPart.slice(optBIndex + 1, optCIndex).trim();
      optC = questionPart.slice(optCIndex + 1, optDIndex).trim();
      optD = questionPart.slice(optDIndex + 1).trim();
    }
  }

  // Clean Rationale
  let rationale = '';
  const ratMatch = answerPart.match(/Rationale([\s\S]*)/);
  if (ratMatch) {
    rationale = ratMatch[1]
      .replace(/Assessment\s+SAT\s+Test\s+Reading and Writing[\s\S]*?Difficulty/g, '')
      .replace(/Question Dif[\s\S]{0,3}culty:\s*(Easy|Medium|Hard)/gi, '')
      .replace(/--\s*\d+\s*of\s*\d+\s*--/g, '')
      .trim();
  }

  return {
    id: 'cb_' + id,
    topicCode,
    correctAnswer,
    difficulty,
    domain,
    rawSkill,
    prompt: passageAndPrompt,
    options: [optA, optB, optC, optD],
    rationale
  };
}

let parsedCount = 0;
let failedIndices = [];
for (let i = 0; i < chunks.length; i++) {
  const res = parseChunk(chunks[i], i);
  if (res && res.correctAnswer && res.options[0] && res.options[1] && res.options[2] && res.options[3] && res.prompt) {
    parsedCount++;
  } else {
    failedIndices.push(i);
  }
}

console.log(`Successfully parsed: ${parsedCount} / ${chunks.length}`);
if (failedIndices.length > 0) {
  console.log(`Failed indices (${failedIndices.length}):`, failedIndices.slice(0, 10));
  console.log('Sample failed chunk:', chunks[failedIndices[0]].slice(0, 400));
}
