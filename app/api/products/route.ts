// 6. UPDATE: app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getProductsCount } from '@/lib/queries/getProducts';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get products and total count
    const [products, totalCount] = await Promise.all([
      getProducts(query, page, limit),
      getProductsCount(query)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      products,
      totalPages,
      currentPage: page,
      totalCount,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}