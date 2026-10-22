const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const apiKey = process.env.GEMINI_API_KEY;

async function testPage1() {
  const imgPath = path.resolve('scripts/cb_120_images/page_01.png');
  const imgData = fs.readFileSync(imgPath).toString('base64');

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `This image contains 2 or 3 official Digital SAT Math questions from the College Board Question Bank.
Extract each question on this page into an array of objects with schema:
[
  {
    "question_id": "...",
    "domain": "...",
    "skill": "...",
    "difficulty": "...",
    "prompt": "clean prompt with KaTeX",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "is_grid_in": false,
    "correct_answer": "...",
    "explanation_en": "...",
    "explanation_uz": "...",
    "desmos_trick": "..."
  }
]
Note: If answers are not marked on the page, solve the question accurately and provide the verified correct answer.
Return ONLY valid JSON array.`
          },
          {
            inline_data: { mime_type: 'image/png', data: imgData }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      response_mime_type: "application/json"
    }
  };

  const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=' + apiKey, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await resp.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("Extracted page 1 questions:");
  console.log(text);
}

testPage1();
