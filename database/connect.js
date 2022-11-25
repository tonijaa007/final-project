import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();
// console.log(config());

export const sql = postgres({
  transform: {
    /* column: {
      to: postgres.fromCamel,
      from: postgres.toCamel,
    }, */
    ...postgres.camel,
  },
});

/* const products = sql`
  SELECT * FROM products;
`; */

export async function getProducts() {
  const products = await sql`
  SELECT * FROM products;
`;
  return products;
}

export async function getProductById(id) {
  const products = await sql`
    SELECT * FROM products WHERE id = ${id}
  `;

  return products[0];
}
/* console.log('products', products);

export function tryConnect() {
  console.log('connect');
} */
