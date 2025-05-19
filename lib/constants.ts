// lib/constants.ts

/**
 * Warna tema utama untuk aplikasi,
 * digunakan untuk styling komponen UI
 */
export const THEME_COLORS = {
  primary: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  secondary: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
};

/**
 * Opsi ukuran kue yang tersedia,
 * dengan label ukuran dan jumlah porsi perkiraan
 */
export const CAKE_SIZES = [
  { value: 'small', label: 'Small (6")', serves: '4-6 people' },
  { value: 'medium', label: 'Medium (8")', serves: '8-10 people' },
  { value: 'large', label: 'Large (10")', serves: '12-16 people' },
  { value: 'xlarge', label: 'Extra Large (12")', serves: '20-24 people' },
];

/**
 * Kategori produk kue,
 * dapat digunakan untuk filter dan navigasi produk
 */
export const CAKE_CATEGORIES = [
  { value: 'romantic', label: 'Romantic Specials' },
  { value: 'anniversary', label: 'Anniversary Cakes' },
  { value: 'valentine', label: 'Valentine Collection' },
  { value: 'wedding', label: 'Wedding Cakes' },
  { value: 'classic', label: 'Classic Flavors' },
  { value: 'custom', label: 'Custom Designs' },
];

/**
 * Pilihan pengiriman untuk produk,
 * dengan harga tambahan per opsi
 */
export const DELIVERY_OPTIONS = [
  { value: 'pickup', label: 'Store Pickup', price: 0 },
  { value: 'standard', label: 'Standard Delivery', price: 10 },
  { value: 'express', label: 'Express Delivery', price: 20 },
  { value: 'luxury', label: 'Luxury Gift Delivery', price: 35 },
];

/**
 * Daftar occasion (moment/event) yang bisa dipilih
 * untuk pesan kue sesuai kebutuhan pelanggan
 */
export const OCCASIONS = [
  'Anniversary',
  "Valentine's Day",
  'Wedding',
  'Birthday',
  'Proposal',
  'Just Because',
  'Apology',
  'Thank You',
];

/**
 * Rating yang dipakai pada testimoni pelanggan
 */
export const TESTIMONIAL_RATINGS = [1, 2, 3, 4, 5];
