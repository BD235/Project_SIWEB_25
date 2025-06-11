'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';

// Schema validasi untuk produk
const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'Price must be positive'),
  stock: z.coerce.number().min(0, 'Stock must be non-negative'),
  category: z.enum(['romantic', 'anniversary', 'valentine', 'lebaran'], {
    errorMap: () => ({ message: 'Please select a valid category' })
  }),
  image: z.string().optional(),
  size: z.enum(['6"', '8"', '10"', '12"'], {
    errorMap: () => ({ message: 'Please select a valid size' })
  }),
  is_new: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  is_best_seller: z.boolean().optional(),
  rating: z.number().optional(),
  review_count: z.number().optional(),
});

const CreateProduct = ProductSchema.omit({ id: true });
const UpdateProduct = ProductSchema.omit({ id: true });

export async function createProduct(formData: FormData) {
  try {
    const validatedData = CreateProduct.parse({
      name: formData.get('name'),
      description: formData.get('description') || '',
      price: formData.get('price'),
      stock: formData.get('stock'),
      category: formData.get('category'),
      image: formData.get('image') || '',
      size: formData.get('size'),
    });

    const { name, description, price, stock, category, image, size } = validatedData;

    const result = await query(`
      INSERT INTO products (name, description, price, stock, category, image, size, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING id
    `, [name, description, price, stock, category, image, size]);

    if (!result.rows.length) throw new Error('Failed to create product');

    revalidatePath('/admin/products');
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error('Error creating product:', error);
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      throw new Error(`Validation error: ${firstError.message}`);
    }
    throw new Error('Failed to create product');
  }
}

export async function updateProduct(id: number, formData: FormData) {
  try {
    const validatedData = UpdateProduct.parse({
      name: formData.get('name'),
      description: formData.get('description') || '',
      price: formData.get('price'),
      stock: formData.get('stock'),
      category: formData.get('category'),
      image: formData.get('image') || '',
      size: formData.get('size'),
    });

    const { name, description, price, stock, category, image, size } = validatedData;

    const existingProduct = await query('SELECT id FROM products WHERE id = $1', [id]);
    if (!existingProduct.rows.length) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const result = await query(`
      UPDATE products
      SET name = $1, description = $2, price = $3, stock = $4, category = $5, image = $6, size = $7, updated_at = NOW()
      WHERE id = $8
      RETURNING id
    `, [name, description, price, stock, category, image, size, id]);

    if (!result.rows.length) throw new Error('Product update failed');

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);
    return { success: true, id: result.rows[0].id };
  } catch (error) {
    console.error('Error updating product:', error);
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      throw new Error(`Validation error: ${firstError.message}`);
    }
    throw new Error(`Failed to update product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function deleteProduct(id: number) {
  try {
    const existingProduct = await query('SELECT id FROM products WHERE id = $1', [id]);
    if (!existingProduct.rows.length) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    if (!result.rows.length) throw new Error('Product deletion failed');

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error(`Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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

// Fungsi transaksi dan lainnya tetap sama
