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
    let queryParams: any[] = [];
    let countParams: any[] = [];

    if (search) {
      whereClause = `WHERE 
        CAST(t.id_transaksi AS TEXT) ILIKE $1 OR 
        CAST(t.id_customer AS TEXT) ILIKE $1 OR 
        c.nama_customer ILIKE $1 OR
        t.status ILIKE $1 OR
        CAST(t.total_revenue AS TEXT) ILIKE $1`;
      
      queryParams.push(`%${search}%`);
      countParams.push(`%${search}%`);
    }

    // Tambah limit dan offset sebagai parameter terakhir untuk query transaksi
    queryParams.push(limit, offset);

    const transactionsQuery = `
      SELECT 
        t.id_transaksi,
        t.id_customer,
        c.nama_customer,
        t.tanggal,
        t.total_revenue,
        t.status,
        TO_CHAR(t.tanggal, 'DD/MM/YYYY') as formatted_date
      FROM transaksi t
      JOIN customer c ON t.id_customer = c.id_customer
      ${whereClause}
      ORDER BY t.tanggal DESC, t.id_transaksi DESC
      LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM transaksi t
      JOIN customer c ON t.id_customer = c.id_customer
      ${whereClause}
    `;

    const [transactionsResult, countResult] = await Promise.all([
      query(transactionsQuery, queryParams),
      query(countQuery, countParams)
    ]);

    const transactions = transactionsResult.rows;
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
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
    });

  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id_customer, total_revenue, status = 'Pending' } = body;

    if (!id_customer || !total_revenue) {
      return NextResponse.json(
        { success: false, error: 'id_customer and total_revenue are required' },
        { status: 400 }
      );
    }

    if (parseFloat(total_revenue) <= 0) {
      return NextResponse.json(
        { success: false, error: 'total_revenue must be positive' },
        { status: 400 }
      );
    }

    const validStatuses = ['Pending', 'Completed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const insertQuery = `
      INSERT INTO transaksi (id_customer, tanggal, total_revenue, status)
      VALUES ($1, CURRENT_DATE, $2, $3)
      RETURNING id_transaksi, id_customer, tanggal, total_revenue, status
    `;

    const result = await query(insertQuery, [id_customer, total_revenue, status]);
    
    if (result.rows.length === 0) {
      throw new Error('Failed to create transaction');
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Transaction created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
