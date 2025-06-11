import { query } from '../db';

export async function getAllProducts() {
  const result = await query('SELECT id_product, nama_product FROM product ORDER BY nama_product ASC');
  return result.rows;
}
