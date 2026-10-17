import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function run() {
  const r1 = await pool.query(
    "UPDATE questions SET domain = 'Problem Solving & Data Analysis' WHERE domain = 'Problem Solving and Data Analysis'"
  );
  const r2 = await pool.query(
    "UPDATE questions SET domain = 'Geometry & Trigonometry' WHERE domain = 'Geometry and Trigonometry'"
  );
  console.log(`Updated ${r1.rowCount} Problem Solving rows and ${r2.rowCount} Geometry rows.`);
  
  const domains = await pool.query("SELECT domain, count(*) FROM questions GROUP BY domain ORDER BY count(*) DESC");
  console.log("Current Domain Distribution:", domains.rows);
  await pool.end();
}

run().catch(console.error);
