const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const apiKey = process.env.GEMINI_API_KEY;

async function testFlash15() {
  const imgPath = 'scripts/extracted_june_samples/page_190_img_0_Im0.png';
  const imgData = fs.readFileSync(imgPath).toString('base64');

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `You are an expert Digital SAT Math curator. Extract this Digital SAT math question from the image into valid JSON with this exact structure:
{
  "id": "q_june_2026_424",
  "domain": "Advanced Math",
  "topic_code": "ADV-01",
  "difficulty": "Hard",
  "prompt": "markdown with KaTeX math",
  "options": [],
  "correct_answer": "68",
  "is_grid_in": true,
  "explanation_en": "Detailed step-by-step English solution",
  "explanation_uz": "Mukammal o'zbekcha yechim",
  "desmos_trick": "Desmos calculator strategy",
  "desmos_latex": "equation for Desmos",
  "reference_formula": "formula used"
}
Return ONLY pure JSON.`
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

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await resp.json();
  if (data.candidates && data.candidates[0]) {
    const text = data.candidates[0].content.parts[0].text;
    console.log('Gemini 1.5 Flash output:');
    console.log(text);
  } else {
    console.log('Error/Response:', JSON.stringify(data, null, 2));
  }
}

testFlash15();
