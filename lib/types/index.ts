// lib/types/index.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  category: string;
  size?: string;
  is_new?: boolean;
  is_featured?: boolean;
  is_best_seller?: boolean;
  rating?: number;
  review_count?: number;
  ingredients?: string[];
  allergens?: string[];
  decorations?: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  comment: string;
  rating: number;
  image?: string;
  date?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product_name?: string;
}

export interface Order {
  id: number;
  customer_name: string;  // sesuaikan dengan kolom di database, misal nama_customer
  // customer_email: string;  // kalau gak ada di db bisa dihapus dulu atau ditambahkan nanti
  delivery_option?: string;  // kalau memang ada field ini di db, kalau gak hapus dulu
  occasion?: string;         // optional, sesuai field db
  delivery_date?: string;    // optional, sesuai field db
  total_price: number;       // kalau di db fieldnya total, pakai nama yang sama supaya konsisten
  status: string;            // status order: 'Processing', 'Shipped', dll
  order_date?: string;       // tanggal order
  items?: OrderItem[];
}

