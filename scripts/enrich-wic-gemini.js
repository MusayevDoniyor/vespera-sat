const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY!");
  process.exit(1);
}

const RAW_FILE = path.resolve('scripts/raw_rw_prof_wic_261.json');
const OUTPUT_FILE = path.resolve('scripts/enriched_wic_questions.json');
const BATCH_SIZE = 6;
const MODEL = 'gemini-2.5-flash';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanExplanationEn(text) {
  if (!text) return '';
  let cleaned = text.replace(/‹/g, '').replace(/›/g, '');
  cleaned = cleaned.replace(/R\s*E\s*A\s*D\s*I\s*N\s*G\s*·\s*C\s*H\s*A\s*P\s*T\s*E\s*R[\s\S]*/i, '');
  cleaned = cleaned.replace(/Book collection by SATLeague[\s\S]*/i, '');
  return cleaned.trim();
}

async function callGemini(batch) {
  const simplifiedBatch = batch.map(q => ({
    num: q.num,
    id: q.id,
    prompt: q.prompt,
    passage: q.passage,
    options: q.options,
    correct_answer: q.correct_answer,
    explanation_en: cleanExplanationEn(q.explanation_en)
  }));

  const systemPrompt = `You are a world-class SAT Verbal master tutor.
For each of the given Digital SAT 'Words in Context' questions:
1. 'passage':
   - For 'Fill in the Blank' questions ("Which choice completes the text..."):
     If the passage does not already have '______', place '______' exactly where the missing word belongs based on the context and correct answer.
   - For 'Find the Synonym' questions ("As used in the text, what does the word..."):
     Keep the passage intact without inserting a blank.
2. 'explanation_uz':
   - Produce a concise, high-impact Uzbek explanation:
     💡 **To'g'ri javob: [Harf] ([So'z/ibora])**
     - **So'z ma'nosi:** [O'zbekcha aniq ma'nosi]
     - **Kontekst kalitlari:** [Matndagi asosiy kalit jumlalar]
     - **Variantlar tahlili:**
       - **A:** [Nega to'g'ri yoki xato]
       - **B:** [Nega to'g'ri yoki xato]
       - **C:** [Nega to'g'ri yoki xato]
       - **D:** [Nega to'g'ri yoki xato]

Return ONLY a valid JSON array of objects:
[
  {
    "num": <number>,
    "passage": "<passage text>",
    "explanation_uz": "<uzbek explanation>"
  }
]`;

  let retries = 0;
  while (retries < 4) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: systemPrompt },
              { text: `Process this batch of questions:\n${JSON.stringify(simplifiedBatch, null, 2)}` }
            ]
          }],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.1
          }
        }),
        signal: AbortSignal.timeout(60000)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[${MODEL}] error (${response.status}): ${errorText.slice(0, 100)}. Retrying in 5s...`);
        retries++;
        await sleep(5000);
        continue;
      }

      const json = await response.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Empty response from Gemini");
      }

      return JSON.parse(text);
    } catch (err) {
      console.warn(`[${MODEL}] exception: ${err.message}. Retrying in 5s...`);
      retries++;
      await sleep(5000);
    }
  }

  throw new Error("Exhausted retries on gemini-2.5-flash");
}

async function main() {
  console.log("=== ENRICHING REMAINING WORDS IN CONTEXT QUESTIONS WITH GEMINI-2.5-FLASH ===");
  const rawQuestions = JSON.parse(fs.readFileSync(RAW_FILE, 'utf8'));

  let enrichedMap = new Map();
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
      existing.forEach(q => enrichedMap.set(q.num, q));
      console.log(`Loaded ${enrichedMap.size} already enriched questions from checkpoint.`);
    } catch (e) {
      console.log("Could not load checkpoint, starting fresh.");
    }
  }

  const pendingQuestions = rawQuestions.filter(q => !enrichedMap.has(q.num));
  console.log(`Total questions: ${rawQuestions.length} | Already done: ${enrichedMap.size} | Pending: ${pendingQuestions.length}`);

  for (let i = 0; i < pendingQuestions.length; i += BATCH_SIZE) {
    const batch = pendingQuestions.slice(i, i + BATCH_SIZE);
    const batchStartNum = batch[0].num;
    const batchEndNum = batch[batch.length - 1].num;
    console.log(`\nProcessing Batch Q${batchStartNum} to Q${batchEndNum} (${batch.length} questions)...`);

    const enrichedResults = await callGemini(batch);
    const resultMap = new Map(enrichedResults.map(r => [r.num, r]));

    for (const rawQ of batch) {
      const res = resultMap.get(rawQ.num);
      const finalQ = {
        ...rawQ,
        passage: res && res.passage ? res.passage : rawQ.passage,
        explanation_en: cleanExplanationEn(rawQ.explanation_en),
        explanation_uz: res && res.explanation_uz ? res.explanation_uz : `💡 To'g'ri javob: ${rawQ.correct_answer}.`
      };
      enrichedMap.set(finalQ.num, finalQ);
    }

    // Save progress after every batch
    const allEnriched = Array.from(enrichedMap.values()).sort((a, b) => a.num - b.num);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allEnriched, null, 2), 'utf8');
    console.log(`✅ Saved progress: ${allEnriched.length} / ${rawQuestions.length} questions enriched.`);

    await sleep(2000);
  }

  console.log("\n🎉 ALL 261 QUESTIONS ENRICHED SUCCESSFULLY!");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
