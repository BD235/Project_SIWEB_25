// app/api/products/featured/route.ts
import { NextResponse } from 'next/server';
import { getFeaturedProducts } from '@/lib/queries/getProducts';

export async function GET() {
  try {
    const products = await getFeaturedProducts();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    return NextResponse.json({ error: 'Failed to fetch featured products' }, { status: 500 });
  }
}
