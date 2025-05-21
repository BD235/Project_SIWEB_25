// app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { getStats } from '@/lib/queries/getStats';

export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('[STATS ERROR]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
