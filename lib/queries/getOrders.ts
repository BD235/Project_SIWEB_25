// lib/queries/getOrders.ts
import { query } from '../db';
import type { Order, OrderItem } from '../types/ndex';

export async function getOrders(): Promise<Order[]> {
  const ordersRes = await query(`SELECT * FROM orders ORDER BY id DESC`);
  const orders = ordersRes.rows;

  for (const order of orders) {
    const itemsRes = await query(`SELECT * FROM order_items WHERE order_id = $1`, [order.id]);
    order.items = itemsRes.rows;
  }

  return orders;
}
