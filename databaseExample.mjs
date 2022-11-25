import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const sql = postgres();

console.log(
  await sql`
  SELECT * FROM products;
  `,
);

// Just for testing, we want connection to the database
await sql.end();

export default sql;
