import fs from 'fs';
import path from 'path';
import { PDFParse } from 'pdf-parse';

const newMaterials = [
  'SAT_Freshman_Transitions_Practice.pdf',
  '@SAT_Top DSAT math vocabularies.pdf',
  'SAT_Elbek_October_real_Test.pdf',
  '2026_October_Predictions_Module_1.pdf',
  '2026_October_Predictions_Module_2.pdf',
  '@SAT_TOP 500 DSAT Critical Reading Questions.pdf',
  '@SAT_Top SQB english only questions.pdf',
  '@SAT_Top SQB english with answers.pdf',
];

async function run() {
  console.log('=== ANALYZING NEW SAT ENGLISH & MATH MATERIALS ===\n');

  for (const filename of newMaterials) {
    const filePath = path.join('materials', filename);
    if (!fs.existsSync(filePath)) {
      console.log(`[NOT FOUND] ${filename}`);
      continue;
    }

    const stat = fs.statSync(filePath);
    console.log(`\n--------------------------------------------------`);
    console.log(`File: ${filename} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);

    try {
      const buffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: buffer });
      const res = await parser.getText();
      console.log(`Total Pages: ${res.total}`);
      console.log(`Total Character Count: ${res.text.length}`);

      // Count potential question markers
      const qMatches = res.text.match(/\b(?:Question|Q\.)\s*\d+|\b\d+\s*[\.\)]\s*[A-Z]/gi) || [];
      console.log(`Detected Question Patterns: ~${qMatches.length}`);

      // First 400 chars preview
      const preview = res.text.replace(/\s+/g, ' ').slice(0, 400);
      console.log(`Preview: ${preview}...`);

      // Save raw text summary to scripts/extracted/
      const outDir = path.join('scripts', 'extracted');
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
      const outPath = path.join(outDir, `${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}.txt`);
      fs.writeFileSync(outPath, res.text, 'utf-8');
      console.log(`Saved full text to: ${outPath}`);
    } catch (err) {
      console.error(`Error parsing ${filename}:`, err.message);
    }
  }
}

run();
