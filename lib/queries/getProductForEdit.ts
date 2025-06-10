import { query } from '@/lib/db';

export interface ProductForEdit {
  id: number;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: string;
  image?: string | null;
}

export async function getProductById(id: number): Promise<ProductForEdit | null> {
  try {
    const result = await query(
      'SELECT id, name, description, price, stock, category, image FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}
