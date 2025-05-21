import { query } from '@/lib/db';

export async function getStats() {
  const result = await query(`
    SELECT 
      (SELECT COUNT(*) FROM products) AS total_products,
      (SELECT COUNT(*) FROM transaksi) AS total_orders,
      (SELECT COUNT(*) FROM customer) AS total_customers,
      (SELECT COALESCE(SUM(subtotal), 0) FROM detail_transaksi) AS total_revenue
  `);
  return result.rows[0];
}


