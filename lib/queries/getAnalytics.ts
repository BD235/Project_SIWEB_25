// lib/queries/getAnalytics.ts
import { query } from '../db';

export async function getMonthlySales() {
  const res = await query(`
    SELECT
      TO_CHAR(order_date, 'YYYY-MM') AS month,
      SUM(total_price) AS total_sales,
      COUNT(*) AS orders_count
    FROM orders
    GROUP BY month
    ORDER BY month ASC
  `);
  return res.rows;
}
