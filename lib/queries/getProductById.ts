// lib/queries/getProductById.ts
import { query } from '../db';
import type { Product } from '../types/ndex';

export async function getProductById(id: number): Promise<Product | null> {
  const res = await query(
    `SELECT id, name, price, image, description, category, size, is_new, is_featured, is_best_seller, rating, review_count 
    FROM products WHERE id = $1`,
    [id]
  );
  return res.rows[0] ?? null;
}
