'use client';

import { useEffect, useState } from 'react';
import Loading from '@/app/admin/loading';

interface Product {
  id: number; // number type, not string
  name: string;
  category: string;
  price: number;
  stock: number;
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then((data: Product[]) => {
        // No remapping needed, data already matches Product interface
        setProducts(data);
      })
      .finally(() => setLoading(false));
  }, []);

    if (loading) return <Loading />;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <h1 className="text-2xl font-bold text-rose-800 mb-6">Product Management</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-rose-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">Product ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider">Category</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(product => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-rose-800">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Rp {product.price.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
