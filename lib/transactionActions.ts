// lib/actions/transactionActions.ts
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';

// Schema validasi untuk transaksi
const TransactionSchema = z.object({
  id_transaksi: z.number(),
  id_customer: z.coerce.number().min(1, 'Customer ID is required'),
  total_revenue: z.coerce.number().min(0.01, 'Total revenue must be greater than 0'),
  status: z.enum(['Pending', 'Completed']),
});

const CreateTransaction = TransactionSchema.omit({ id_transaksi: true });
const UpdateTransaction = TransactionSchema.omit({ id_transaksi: true }).partial();

export async function createTransaction(formData: FormData) {
  try {
    const nama_customer = formData.get('nama_customer');
    const total_revenue = formData.get('total_revenue');
    const status = formData.get('status') || 'Pending';

    if (!nama_customer || typeof nama_customer !== 'string' || nama_customer.trim() === '') {
      throw new Error('Nama customer wajib diisi');
    }
    if (!total_revenue || isNaN(Number(total_revenue)) || Number(total_revenue) <= 0) {
      throw new Error('Total revenue harus lebih dari 0');
    }

    // Cek apakah nama_customer sudah ada di tabel customer
    let customerResult = await query(
      `SELECT id_customer FROM customer WHERE nama_customer = $1`,
      [nama_customer.trim()]
    );

    let id_customer;
    if (customerResult.rows.length > 0) {
      // Jika sudah ada, pakai id_customer yang ada
      id_customer = customerResult.rows[0].id_customer;
    } else {
      // Jika belum ada, insert customer baru dan ambil id_customer-nya
      const insertCustomer = await query(
        `INSERT INTO customer (nama_customer) VALUES ($1) RETURNING id_customer`,
        [nama_customer.trim()]
      );
      id_customer = insertCustomer.rows[0].id_customer;
    }

    // Insert transaksi dengan id_customer yang didapat
    const insertTransaction = await query(
      `
      INSERT INTO transaksi (id_customer, tanggal, total_revenue, status)
      VALUES ($1, CURRENT_DATE, $2, $3)
      RETURNING id_transaksi, id_customer, tanggal, total_revenue, status
      `,
      [id_customer, Number(total_revenue), status]
    );

    if (!insertTransaction.rows.length) {
      throw new Error('Failed to create transaction');
    }

    revalidatePath('/admin/transaction');
    return { success: true, data: insertTransaction.rows[0] };

  } catch (error) {
    console.error('Error creating transaction:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create transaction');
  }
}


export async function updateTransaction(id: number, formData: FormData) {
  try {
    const validatedData = UpdateTransaction.parse({
      id_customer: formData.get('id_customer') ? formData.get('id_customer') : undefined,
      total_revenue: formData.get('total_revenue') ? formData.get('total_revenue') : undefined,
      status: formData.get('status') ? formData.get('status') : undefined,
    });

    // Check if transaction exists
    const existingTransaction = await query(
      'SELECT id_transaksi FROM transaksi WHERE id_transaksi = $1',
      [id]
    );

    if (!existingTransaction.rows.length) {
      throw new Error(`Transaction with ID ${id} not found`);
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (validatedData.id_customer !== undefined) {
      updateFields.push(`id_customer = $${paramCount}`);
      updateValues.push(validatedData.id_customer);
      paramCount++;
    }

    if (validatedData.total_revenue !== undefined) {
      updateFields.push(`total_revenue = $${paramCount}`);
      updateValues.push(validatedData.total_revenue);
      paramCount++;
    }

    if (validatedData.status !== undefined) {
      updateFields.push(`status = $${paramCount}`);
      updateValues.push(validatedData.status);
      paramCount++;
    }

    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }

    updateValues.push(id);

    const updateQuery = `
      UPDATE transaksi 
      SET ${updateFields.join(', ')}
      WHERE id_transaksi = $${paramCount}
      RETURNING id_transaksi, id_customer, tanggal, total_revenue, status
    `;

    const result = await query(updateQuery, updateValues);

    if (!result.rows.length) {
      throw new Error('Transaction update failed');
    }

    revalidatePath('/admin/transaction');
    revalidatePath(`/admin/transaction/${id}`);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error updating transaction:', error);
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.errors[0].message}`);
    }
    throw new Error(`Failed to update transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function deleteTransaction(id: number) {
  try {
    // Check if transaction exists
    const existingTransaction = await query(
      'SELECT id_transaksi FROM transaksi WHERE id_transaksi = $1',
      [id]
    );

    if (!existingTransaction.rows.length) {
      throw new Error(`Transaction with ID ${id} not found`);
    }

    const result = await query(
      'DELETE FROM transaksi WHERE id_transaksi = $1 RETURNING id_transaksi',
      [id]
    );

    if (!result.rows.length) {
      throw new Error('Transaction deletion failed');
    }

    revalidatePath('/admin/transaction');
    return { success: true };
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error(`Failed to delete transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Function untuk mendapatkan semua transaksi dengan search dan pagination
export async function getTransactions(searchQuery: string = '', page: number = 1, limit: number = 10) {
  try {
    const offset = (page - 1) * limit;
    
    let whereClause = '';
    let queryParams: any[] = [limit, offset];
    let countParams: any[] = [];

    if (searchQuery) {
      whereClause = `WHERE 
        CAST(id_transaksi AS TEXT) ILIKE $3 OR 
        CAST(id_customer AS TEXT) ILIKE $3 OR 
        status ILIKE $3 OR
        CAST(total_revenue AS TEXT) ILIKE $3`;
      queryParams.push(`%${searchQuery}%`);
      countParams.push(`%${searchQuery}%`);
    }

    // Get transactions
    const transactionsQuery = `
      SELECT 
        id_transaksi,
        id_customer,
        tanggal,
        total_revenue,
        status,
        TO_CHAR(tanggal, 'DD/MM/YYYY') as formatted_date
      FROM transaksi
      ${whereClause}
      ORDER BY tanggal DESC, id_transaksi DESC
      LIMIT $1 OFFSET $2
    `;

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM transaksi
      ${whereClause}
    `;

    const [transactionsResult, countResult] = await Promise.all([
      query(transactionsQuery, queryParams),
      query(countQuery, countParams)
    ]);

    const transactions = transactionsResult.rows;
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        transactions,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      }
    };
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
}

// Function untuk mendapatkan detail transaksi by ID
export async function getTransactionById(id: number) {
  try {
    const result = await query(`
      SELECT 
        id_transaksi,
        id_customer,
        tanggal,
        total_revenue,
        status,
        TO_CHAR(tanggal, 'DD/MM/YYYY') as formatted_date,
        TO_CHAR(tanggal, 'YYYY-MM-DD') as iso_date
      FROM transaksi 
      WHERE id_transaksi = $1
    `, [id]);

    if (!result.rows.length) {
      throw new Error(`Transaction with ID ${id} not found`);
    }

    return { success: true, data: result.rows[0] };
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw new Error(`Failed to fetch transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}