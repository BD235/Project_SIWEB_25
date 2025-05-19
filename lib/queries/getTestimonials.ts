// lib/queries/getTestimonials.ts
import { query } from '../db';
import type { Testimonial } from '../types/ndex';

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await query(
    `SELECT id, name, role, comment, rating, image, date FROM testimonials ORDER BY date DESC`
  );
  return res.rows;
}
