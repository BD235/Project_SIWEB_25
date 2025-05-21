// lib/queries/getMonthlySales.ts
import { query } from '../db';

export async function getMonthlySales() {
  const res = await query(`
    SELECT
        TO_CHAR(tanggal, 'YYYY-MM') AS month,
        COUNT(id_transaksi) AS sales_count,
        SUM(total_revenue) AS total_revenue
    FROM transaksi
    GROUP BY month
    ORDER BY month ASC
  `);
  return res.rows;
}