'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import RomanticButton from '@/components/ui/RomanticButton';
import LoveInput from '@/components/ui/LoveInput';
import Alert from '@/components/ui/Alert';

interface ProductData {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  size: string;
  image?: string;
}

async function fetchProduct(id: string): Promise<{ product: ProductData; categories: string[] }> {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error('Failed to fetch product');
  }
  return res.json();
}

// import server action updateProduct dari file actions (server)
import { updateProduct } from '@/lib/actions';

export default function ProductEditPage() {
  const router = useRouter();
  const params = useParams();
  
  const [id, setId] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  // Handle params extraction
  useEffect(() => {
    const extractId = async () => {
      const extractedId = Array.isArray(params?.id) ? params.id[0] : params?.id;
      setId(extractedId || null);
    };
    
    extractId();
  }, [params]);

  useEffect(() => {
    if (!id) {
      if (id === null) return; // Still loading params
      setAlert({ type: 'error', message: 'Product ID is required' });
      setLoading(false);
      return;
    }

    fetchProduct(id)
      .then((data) => {
        setProduct(data.product);
        setCategories(data.categories);
        setLoading(false);
      })
      .catch((err) => {
        setAlert({ type: 'error', message: err.message });
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(formData: FormData) {
    if (!id) {
      setAlert({ type: 'error', message: 'Product ID is missing' });
      return;
    }

    setAlert(null);

    startTransition(async () => {
      try {
        await updateProduct(Number(id), formData);
        setAlert({ type: 'success', message: 'Product updated successfully! Redirecting...' });
        setTimeout(() => router.push('/admin/products'), 1000);
      } catch (err) {
        setAlert({ 
          type: 'error', 
          message: err instanceof Error ? err.message : 'Failed to update product' 
        });
      }
    });
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          <span className="ml-2">Loading product data...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Product not found or failed to load.</p>
          <Link 
            href="/admin/products" 
            className="text-red-800 underline hover:no-underline mt-2 inline-block"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
          duration={4000} 
        />
      )}

      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/admin/products" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Edit Product: {product.name}
        </h2>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <LoveInput
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              required
              disabled={isPending}
              defaultValue={product.name}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              placeholder="Enter product description"
              disabled={isPending}
              defaultValue={product.description || ''}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (Rp) *
              </label>
              <LoveInput
                id="price"
                name="price"
                type="number"
                placeholder="0"
                min="0"
                step="1000"
                required
                disabled={isPending}
                defaultValue={product.price.toString()}
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <LoveInput
                id="stock"
                name="stock"
                type="number"
                placeholder="0"
                min="0"
                required
                disabled={isPending}
                defaultValue={product.stock.toString()}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              required
              disabled={isPending}
              defaultValue={product.category}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
              Size *
            </label>
            <select
              id="size"
              name="size"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              required
              disabled={isPending}
              defaultValue={product.size}
            >
              <option value="">Select size</option>
              <option value='6"'>6"</option>
              <option value='8"'>8"</option>
              <option value='10"'>10"</option>
              <option value='12"'>12"</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image Path
            </label>
            <LoveInput
              id="image"
              name="image"
              type="text"
              placeholder="/images/cake.jpg"
              disabled={isPending}
              defaultValue={product.image || ''}
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter path like <code className="bg-gray-100 px-1 rounded">/images/cake.jpg</code>
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <RomanticButton 
              type="submit" 
              className="flex-1" 
              disabled={isPending}
            >
              {isPending ? 'Updating...' : 'Update Product'}
            </RomanticButton>
            <Link 
              href="/admin/products" 
              className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}