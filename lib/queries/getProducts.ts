import { query } from '../db';
import type { Product } from '../types/ndex';

export async function getProducts(): Promise<Product[]> {
  const res = await query(
    `SELECT id, name, price, image, description, category, size, is_new, is_featured, is_best_seller, rating, review_count 
     FROM products ORDER BY id ASC`
  );
  return res.rows;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await query(
    `SELECT id, name, price, image, description, category, size, is_new, is_featured, is_best_seller, rating, review_count 
     FROM products WHERE is_featured = true ORDER BY id DESC`
  );
  return res.rows;
}
