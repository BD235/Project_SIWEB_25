import { query } from '@/lib/db';

export async function getStats() {
  const result = await query(`
    SELECT 
      (SELECT COUNT(*) FROM products) AS total_products,
      (SELECT COUNT(*) FROM transaksi) AS total_orders,
      (SELECT COUNT(DISTINCT nama_customer) FROM transaksi) AS total_customers,
      (SELECT COALESCE(SUM(total_revenue), 0) FROM transaksi) AS total_revenue
  `);
  return result.rows[0];
}
