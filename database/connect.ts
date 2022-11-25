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

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
};
/* const products = sql`
  SELECT * FROM products;
`; */

export async function getProducts() {
  const products = await sql<[Product][]>`
  SELECT * FROM products;
`;
  return products;
}

export async function getProductById(id: number) {
  const [product] = await sql<[Product]>`
    SELECT * FROM products WHERE id = ${id}
  `;

  return product;
}
// console.log('products', products);

/* export function tryConnect() {
  console.log('connect');
} */
