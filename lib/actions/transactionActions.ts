'use server';

import { z } from 'zod';
import { query } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const TransactionSchema = z.object({
  nama_customer: z.string().min(1, 'Customer name is required'),
  total_revenue: z.coerce.number().min(0.01, 'Total revenue must be greater than 0'),
  status: z.enum(['Pending', 'Completed']),
  id_produk: z.coerce.number().min(1, 'Product must be selected'),
  qty: z.coerce.number().min(1, 'Quantity must be at least 1'),
  harga_satuan: z.coerce.number().min(0, 'Price per unit must be 0 or greater'),
});

export async function createTransaction(formData: FormData) {
  try {
    // Validate the form data
    const data = TransactionSchema.parse({
      nama_customer: formData.get('nama_customer'),
      total_revenue: formData.get('total_revenue'),
      status: formData.get('status') || 'Pending',
      id_produk: formData.get('id_produk'),
      qty: formData.get('qty'),
      harga_satuan: formData.get('harga_satuan'),
    });

    // Verify the product exists and get its current price
    const productCheckQuery = `
      SELECT id, name, price 
      FROM products 
      WHERE id = $1 AND is_deleted = false
    `;
    
    const productResult = await query(productCheckQuery, [data.id_produk]);
    
    if (!productResult.rows.length) {
      throw new Error('Selected product does not exist or is no longer available');
    }

    const product = productResult.rows[0];
    
    // Optional: Verify the price hasn't changed (for data integrity)
    if (product.price !== data.harga_satuan) {
      console.warn(`Price mismatch for product ${product.name}: expected ${product.price}, got ${data.harga_satuan}`);
      // You can choose to use the current product price or throw an error
      // data.harga_satuan = product.price;
      // data.total_revenue = data.qty * product.price;
    }

    // Insert the transaction
    const insertQuery = `
      INSERT INTO transaksi (
        nama_customer, tanggal, total_revenue, status,
        id_produk, qty, harga_satuan
      )
      VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await query(insertQuery, [
      data.nama_customer,
      data.total_revenue,
      data.status,
      data.id_produk,
      data.qty,
      data.harga_satuan,
    ]);

    if (!result.rows.length) {
      throw new Error('Failed to create transaction');
    }

    // Revalidate the transactions page
    revalidatePath('/admin/transaction');
    
    return { 
      success: true, 
      data: result.rows[0],
      message: 'Transaction created successfully'
    };

  } catch (error) {
    console.error('Error creating transaction:', error);
    
    // Handle validation errors specifically
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message).join(', ');
      throw new Error(`Validation error: ${errorMessages}`);
    }
    
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}


export async function deleteTransaction(id: number) {
  try {
    const result = await query('DELETE FROM transaksi WHERE id_transaksi = $1 RETURNING id_transaksi', [id]);
    if (!result.rows.length) throw new Error('Transaction not found or failed to delete');

    revalidatePath('/admin/transaction');
    return { success: true };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error('Failed to delete transaction');
  }
}

export async function getTransactionById(id: number) {
  try {
    const result = await query(`
      SELECT *, TO_CHAR(tanggal, 'YYYY-MM-DD') AS iso_date
      FROM transaksi
      WHERE id_transaksi = $1
    `, [id]);

    if (!result.rows.length) throw new Error(`Transaction ID ${id} not found`);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw new Error('Failed to fetch transaction');
  }
}
