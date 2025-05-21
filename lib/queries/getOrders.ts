import { query } from '@/lib/db';

export async function getOrders() {
  const sql = `
    SELECT 
      o.id AS order_id,
      c.nama_customer,
      o.order_date,
      o.total,
      o.status
    FROM orders o
    JOIN customer c ON o.customer_id = c.id_customer
    ORDER BY o.order_date DESC
  `;
  const result = await query(sql);
  return result.rows;
}
