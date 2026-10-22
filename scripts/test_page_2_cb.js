const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const apiKey = process.env.GEMINI_API_KEY;

async function testPage2() {
  const imgPath = path.resolve('scripts/cb_120_images/page_02.png');
  const imgData = fs.readFileSync(imgPath).toString('base64');

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Extract all questions from this College Board SAT Math page into a JSON array:
[
  {
    "question_id": "...",
    "domain": "Geometry & Trigonometry" | "Algebra" | "Advanced Math" | "Problem Solving & Data Analysis",
    "topic_code": "GEO-01" | "GEO-02" | "GEO-03" | "GEO-04" | "ALG-01" | "ADV-01" | "DAT-01",
    "difficulty": "Easy" | "Medium" | "Hard",
    "prompt": "clean prompt with KaTeX math",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "is_grid_in": false,
    "correct_answer": "...",
    "explanation_en": "...",
    "explanation_uz": "...",
    "desmos_trick": "..."
  }
]
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
  console.log("Extracted page 2 questions:");
  console.log(text);
}

testPage2();
