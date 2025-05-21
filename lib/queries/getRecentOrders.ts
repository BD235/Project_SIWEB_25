import { query } from '../db';

export async function getRecentOrders() {
  const sql = `
    SELECT
      t.id_transaksi AS id,
      c.nama_customer AS customer,
      p.name AS product,
      t.tanggal AS date,
      t.status
    FROM transaksi t
    JOIN customer c ON t.id_customer = c.id_customer
    JOIN detail_transaksi dt ON t.id_transaksi = dt.id_transaksi
    JOIN products p ON dt.id_produk = p.id
    ORDER BY t.tanggal DESC
    LIMIT 5
  `;
  const res = await query(sql);
  console.log('getRecentOrders result:', res.rows);
  return res.rows;
}
