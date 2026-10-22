const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const apiKey = process.env.GEMINI_API_KEY;

async function test86() {
  const imgPath = path.resolve('scripts/june_math_images/page_086.png');
  const imgData = fs.readFileSync(imgPath).toString('base64');
  
  const payload = {
    contents: [
      {
        parts: [
          { text: "Extract this SAT Math question into JSON. Return ONLY JSON." },
          { inline_data: { mime_type: 'image/png', data: imgData } }
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
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log("Raw length:", raw?.length);
  fs.writeFileSync('scripts/raw_86.json', raw || '');
  console.log("Saved raw to scripts/raw_86.json");
  
  try {
    const p = JSON.parse(raw);
    console.log("Direct JSON.parse SUCCESS!");
  } catch(e) {
    console.log("Direct JSON.parse FAILED:", e.message);
  }
}

test86();
