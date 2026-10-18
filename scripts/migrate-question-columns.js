const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkCols() {
  const res = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_schema = 'vespera' AND table_name = 'questions'
    ORDER BY ordinal_position
  `);
  console.log('Columns in vespera.questions:');
  res.rows.forEach(r => console.log(` - ${r.column_name}: ${r.data_type}`));

  // Check if diagram_svg or diagram_preset exist, if not add them
  const colNames = res.rows.map(r => r.column_name);
  if (!colNames.includes('diagram_svg')) {
    console.log('Adding diagram_svg column...');
    await pool.query('ALTER TABLE vespera.questions ADD COLUMN IF NOT EXISTS diagram_svg TEXT;');
  }
  if (!colNames.includes('diagram_preset')) {
    console.log('Adding diagram_preset column...');
    await pool.query('ALTER TABLE vespera.questions ADD COLUMN IF NOT EXISTS diagram_preset TEXT;');
  }
  console.log('Columns check & migration complete.');
  await pool.end();
}

checkCols().catch(e => {
  console.error(e);
  process.exit(1);
});
