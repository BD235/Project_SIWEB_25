// lib/types/index.ts

export interface Product {
  id: number;
  name: string;
  price: number;
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
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  delivery_option: string;
  occasion?: string;
  delivery_date?: string;
  total_price: number;
  items?: OrderItem[];
}
