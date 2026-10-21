const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function checkGeometry() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query(`
    SELECT id, prompt, diagram_svg, diagram_preset 
    FROM vespera.questions 
    WHERE domain ILIKE '%Geometry%'
    ORDER BY id;
  `);

  console.log(`Total Geometry questions in DB: ${res.rows.length}`);
  let withDiagram = 0;
  let mentionsFigure = 0;
  let figureWithoutDiagram = [];

  for (const q of res.rows) {
    const hasVisual = !!q.diagram_svg || !!q.diagram_preset;
    if (hasVisual) withDiagram++;
    const text = q.prompt || '';
    if (/figure|triangle|circle|polygon|parallelogram|quadrilateral|trapezoid|cylinder|cone|pyramid|box/i.test(text)) {
      if (/in the figure|shown in the figure|the figure shows|figure above|figure below|the given figure/i.test(text)) {
        mentionsFigure++;
        if (!hasVisual) {
          figureWithoutDiagram.push({ id: q.id, prompt: text.slice(0, 100) });
        }
      }
    }
  }

  console.log(`With diagram_svg or preset: ${withDiagram}`);
  console.log(`Mentions 'in the figure': ${mentionsFigure}`);
  console.log(`Mentions figure BUT missing visual: ${figureWithoutDiagram.length}`);
  console.table(figureWithoutDiagram);
  await pool.end();
}

checkGeometry();
