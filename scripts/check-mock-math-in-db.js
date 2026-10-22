const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

async function checkMockMathInDb() {
  const exams = JSON.parse(fs.readFileSync('src/lib/bluebook-exams-data.json', 'utf8'));
  const mockMathMap = new Map();
  exams.forEach(e => {
    ['mathModule1', 'mathModule2Hard', 'mathModule2Easy'].forEach(m => {
      (e[m] || []).forEach(q => {
        if (!mockMathMap.has(q.id)) {
          mockMathMap.set(q.id, q);
        }
      });
    });
  });

  console.log(`Unique Math questions in mock exams: ${mockMathMap.size}`);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const dbMathRes = await pool.query("SELECT id FROM vespera.questions WHERE section = 'MATH'");
  const dbMathIds = new Set(dbMathRes.rows.map(r => r.id));
  console.log(`Math questions in DB: ${dbMathIds.size}`);

  let inDb = 0;
  let missingFromDb = [];
  for (const [id, q] of mockMathMap.entries()) {
    if (dbMathIds.has(id)) {
      inDb++;
    } else {
      missingFromDb.push(q);
    }
  }

  console.log(`Mock Math questions already in DB: ${inDb}`);
  console.log(`Mock Math questions MISSING from DB: ${missingFromDb.length}`);
  if (missingFromDb.length > 0) {
    console.log('Sample missing Math question #1:');
    console.log(missingFromDb[0].id, missingFromDb[0].domain, missingFromDb[0].prompt?.slice(0, 80));
  }

  await pool.end();
}

checkMockMathInDb();
