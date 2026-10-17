import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://kaizo:2009@localhost:5432/vespera",
});

async function main() {
  const qCols = await pool.query(
    "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'questions';"
  );
  console.log("questions columns:", qCols.rows.map((r) => r.column_name));

  const tCols = await pool.query(
    "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'topics';"
  );
  console.log("topics columns:", tCols.rows.map((r) => r.column_name));
  await pool.end();
}

main().catch(console.error);
