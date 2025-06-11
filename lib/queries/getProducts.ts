import { query } from '../db';
import type { Product } from '../types/index';

const allowedCategories = ['romantic', 'anniversary', 'valentine', 'lebaran'];

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
    WHERE category = ANY($1)
  `;

  const params: any[] = [allowedCategories];

  if (searchQuery && searchQuery.trim() !== '') {
    sqlQuery += ` AND (
      LOWER(name) LIKE LOWER($2) OR 
      LOWER(category) LIKE LOWER($2) OR 
      LOWER(description) LIKE LOWER($2)
    )`;
    params.push(`%${searchQuery.trim()}%`);
  }

  sqlQuery += ` ORDER BY id ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(itemsPerPage, offset);

  const res = await query(sqlQuery, params);
  return res.rows;
}

export async function getProductsCount(searchQuery?: string): Promise<number> {
  let sqlQuery = `SELECT COUNT(*) as count FROM products WHERE category = ANY($1)`;
  const params: any[] = [allowedCategories];

  if (searchQuery && searchQuery.trim() !== '') {
    sqlQuery += ` AND (
      LOWER(name) LIKE LOWER($2) OR 
      LOWER(category) LIKE LOWER($2) OR 
      LOWER(description) LIKE LOWER($2)
    )`;
    params.push(`%${searchQuery.trim()}%`);
  }

  const res = await query(sqlQuery, params);
  return parseInt(res.rows[0].count);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await query(
    `SELECT id, name, price, image, description, category, size, 
            is_new, is_featured, is_best_seller, rating, review_count 
     FROM products 
     WHERE is_featured = true AND category = ANY($1) 
     ORDER BY id DESC`,
    [allowedCategories]
  );
  return res.rows;
}

export async function getAllProducts() {
  try {
    const result = await query(`
      SELECT 
        id,
        name,
        price
      FROM products 
      ORDER BY name ASC
    `);

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      price: row.price
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}
