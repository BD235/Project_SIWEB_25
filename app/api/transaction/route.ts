import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let whereClause = '';
    const queryParams: any[] = [];
    const countParams: any[] = [];

    if (search) {
      whereClause = `WHERE 
        CAST(t.id_transaksi AS TEXT) ILIKE $1 OR 
        t.nama_customer ILIKE $1 OR
        t.status ILIKE $1 OR
        CAST(t.total_revenue AS TEXT) ILIKE $1 OR
        p.name ILIKE $1`;

      queryParams.push(`%${search}%`);
      countParams.push(`%${search}%`);
    }

    queryParams.push(limit, offset);

    const transactionsQuery = `
      SELECT 
        t.id_transaksi,
        t.nama_customer,
        t.tanggal,
        t.total_revenue,
        t.status,
        t.id_produk,
        p.name AS jenis_produk,
        t.qty AS jumlah,
        t.harga_satuan,
        TO_CHAR(t.tanggal, 'DD/MM/YYYY') AS formatted_date
      FROM transaksi t
      JOIN products p ON t.id_produk = p.id
      ${whereClause}
      ORDER BY t.tanggal DESC, t.id_transaksi DESC
      LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}
    `;

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM transaksi t
      JOIN products p ON t.id_produk = p.id
      ${whereClause}
    `;

    const [transactionsResult, countResult] = await Promise.all([
      query(transactionsQuery, queryParams),
      query(countQuery, countParams)
    ]);

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        transactions: transactionsResult.rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalItems: total,
          itemsPerPage: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
