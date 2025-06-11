// ===== FIXED: components/admin/ProductsList.tsx =====
'use client';

import { useEffect, useState, useCallback } from 'react';
import { deleteProduct } from '@/lib/actions/actionsProducts';
import AdminProductsSkeleton from '@/components/admin/skeleton/AdminProductsSkeleton';
import Pagination from '@/components/ui/Pagination';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
}

interface ProductsListProps {
  query?: string;
  currentPage?: number;
}

function DeleteProductButton({ id, name, onDelete }: { 
  id: number; 
  name: string; 
  onDelete: () => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteProduct(id);
      onDelete(); // Refresh the list
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
      title="Delete Product"
    >
      <TrashIcon className={`w-5 h-5 ${isDeleting ? 'animate-spin' : ''}`} />
    </button>
  );
}

function EditProductButton({ id }: { id: number }) {
  return (
    <Link
      href={`/admin/products/${id}`}
      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
      title="Edit Product"
    >
      <PencilIcon className="w-5 h-5" />
    </Link>
  );
}

export default function ProductsList({ query = '', currentPage = 1 }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '5',
        ...(query && { query }),
      });

      const response = await fetch(`/api/products?${searchParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      setProducts(data.products || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [query, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductDelete = useCallback(() => {
    fetchProducts(); // Refresh the list after deletion
  }, [fetchProducts]);

  if (loading) return <AdminProductsSkeleton />;

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={fetchProducts}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    {query ? `No products found for "${query}"` : 'No products available'}
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.image && (
                          <div className="flex-shrink-0 h-12 w-12 mr-4">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={product.image}
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          {product.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rp {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          product.stock > 10
                            ? 'bg-green-100 text-green-800'
                            : product.stock > 0
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <EditProductButton id={product.id} />
                        <DeleteProductButton 
                          id={product.id} 
                          name={product.name} 
                          onDelete={fetchProducts}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}