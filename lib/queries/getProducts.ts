// 1. UPDATE: lib/queries/getProducts.ts
import { query } from '../db';
import type { Product } from '../types/ndex';

export async function getProducts(
  searchQuery?: string,
  currentPage: number = 1,
  itemsPerPage: number = 10
): Promise<Product[]> {
  const offset = (currentPage - 1) * itemsPerPage;
  
  let sqlQuery = `
    SELECT id, name, price, stock, image, description, category, size, 
           is_new, is_featured, is_best_seller, rating, review_count 
    FROM products 
  `;
  
  const params: any[] = [];
  
  if (searchQuery && searchQuery.trim() !== '') {
    sqlQuery += `
      WHERE (
        LOWER(name) LIKE LOWER($${params.length + 1}) OR 
        LOWER(category) LIKE LOWER($${params.length + 1}) OR 
        LOWER(description) LIKE LOWER($${params.length + 1})
      )
    `;
    params.push(`%${searchQuery.trim()}%`);
  }
  
  sqlQuery += ` ORDER BY id ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(itemsPerPage, offset);
  
  const res = await query(sqlQuery, params);
  return res.rows;
}

export async function getProductsCount(searchQuery?: string): Promise<number> {
  let sqlQuery = 'SELECT COUNT(*) as count FROM products';
  const params: any[] = [];
  
  if (searchQuery && searchQuery.trim() !== '') {
    sqlQuery += `
      WHERE (
        LOWER(name) LIKE LOWER($1) OR 
        LOWER(category) LIKE LOWER($1) OR 
        LOWER(description) LIKE LOWER($1)
      )
    `;
    params.push(`%${searchQuery.trim()}%`);
  }
  
  const res = await query(sqlQuery, params);
  return parseInt(res.rows[0].count);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await query(
    `SELECT id, name, price, image, description, category, size, is_new, is_featured, is_best_seller, rating, review_count 
     FROM products WHERE is_featured = true ORDER BY id DESC`
  );
  return res.rows;
}