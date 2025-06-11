import { NextResponse } from 'next/server';
import { getStats } from '@/lib/queries/getStats';

export async function GET() {
  try {
    const stats = await getStats();
    console.log('Stats fetched:', stats); // <--- tambahkan log
    return NextResponse.json(stats);
  } catch (error) {
    console.error('[STATS ERROR]', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
