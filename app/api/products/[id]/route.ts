import { NextResponse } from 'next/server';
import { updateProduct } from '@/lib/actions/actionsProducts';
import { query } from '@/lib/db';

interface CategoryRow {
  category: string;
}

// GET handler untuk mengambil data produk by ID beserta kategori
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  try {
    // Ambil data produk
    const productResult = await query(
      'SELECT id, name, description, price, stock, category, image, size FROM products WHERE id = $1',
      [id]
    );

    if (productResult.rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Ambil daftar kategori yang tersedia
    const categoriesResult = await query(
      'SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category'
    );

    const categories = categoriesResult.rows.map((row: CategoryRow) => row.category);

    // Return produk beserta kategori
    return NextResponse.json({
      product: productResult.rows[0],
      categories: categories
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PATCH handler untuk update produk
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  const formData = await request.formData();

  try {
    const result = await updateProduct(id, formData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update product' },
      { status: 500 }
    );
  }
}
