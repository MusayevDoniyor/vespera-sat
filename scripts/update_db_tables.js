const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { Pool } = require('pg');

const masterPath = path.resolve('scripts/exported_all_questions.json');
const allQuestions = JSON.parse(fs.readFileSync(masterPath, 'utf8'));

async function updateDb() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    for (const q of allQuestions) {
      if (q.id === 'cb_38e79659' || q.id === 'cb_4042ff0b') {
        await client.query('UPDATE vespera.questions SET prompt = $1 WHERE id = $2', [q.prompt, q.id]);
        console.log(`Updated ${q.id} in PostgreSQL!`);
      }
    }
  } finally {
    client.release();
    await pool.end();
  }
}

updateDb().catch(console.error);
