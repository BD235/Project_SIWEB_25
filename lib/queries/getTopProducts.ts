// lib/queries/getTopProducts.ts
import { query } from "../db";

export async function getTopProducts() {
  const res = await query(`
    SELECT 
      p.name AS nama_produk,
      SUM(t.qty) AS total_terjual
    FROM transaksi t
    JOIN products p ON t.id_produk = p.id
    GROUP BY p.name
    ORDER BY total_terjual DESC
    LIMIT 10
  `);
  return res.rows;
}

