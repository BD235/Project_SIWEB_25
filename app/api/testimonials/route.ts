import { NextResponse } from 'next/server';
import { getTestimonials } from '@/lib/queries/getTestimonials';

export async function GET() {
  const testimonials = await getTestimonials();
  return NextResponse.json(testimonials);
}
