const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const key = process.env.GEMINI_API_KEY;

async function testVision() {
  const imgPath = path.resolve('scripts/june_math_images/page_001.png');
  const imgData = fs.readFileSync(imgPath).toString('base64');
  
  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Extract this Digital SAT Math question from the image into clean JSON with this exact schema:
{
  "prompt": "Full question prompt with KaTeX math if needed",
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correct_answer": "B",
  "is_grid_in": false,
  "topic_code": "GEO-01",
  "domain": "Geometry and Trigonometry",
  "difficulty": "Easy",
  "explanation_en": "Detailed step-by-step solution",
  "explanation_uz": "Mukammal o'zbekcha yechim",
  "desmos_trick": "Desmos calculator hack or shortcut"
}
Check which option has the purple border or which number is entered in the response box.
Return ONLY valid JSON.`
          },
          {
            inline_data: {
              mime_type: 'image/png',
              data: imgData
            }
          }
        ]
      }
    ]
  };

  const resp = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=' + key, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await resp.json();
  console.log('STATUS:', resp.status);
  if (data.candidates && data.candidates[0]) {
    console.log('REPLY:\n', data.candidates[0].content.parts[0].text);
  } else {
    console.log('RESPONSE:', JSON.stringify(data, null, 2));
  }
}

testVision();
