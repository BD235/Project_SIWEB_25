'use client';

import { useState, useTransition } from 'react';
import { createProduct } from '@/lib/actions/actionsProducts';
import RomanticButton from '@/components/ui/RomanticButton';
import LoveInput from '@/components/ui/LoveInput';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Alert from '@/components/ui/Alert';

interface ProductCreateFormProps {
  categories: string[];
}

export default function ProductCreateForm({ categories }: ProductCreateFormProps) {
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setAlert(null);

    startTransition(async () => {
      try {
        await createProduct(formData);
        setAlert({ type: 'success', message: 'Product created successfully! Redirecting...' });
        setTimeout(() => {
          router.push('/admin/products');
        }, 1000);
      } catch (err) {
        setAlert({ type: 'error', message: err instanceof Error ? err.message : 'Failed to create product' });
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={4000}
        />
      )}

      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Product</h2>

        <form action={handleSubmit} className="space-y-6">
          {/* Form inputs... (sama seperti sebelumnya) */}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <LoveInput id="name" name="name" type="text" placeholder="Enter product name" required disabled={isPending} />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea id="description" name="description" rows={4} className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-100" placeholder="Enter product description" disabled={isPending} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price (Rp) *</label>
              <LoveInput id="price" name="price" type="number" placeholder="0" min="0" step="1000" required disabled={isPending} />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
              <LoveInput id="stock" name="stock" type="number" placeholder="0" min="0" required disabled={isPending} />
            </div>
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select id="category" name="category" className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-100" required disabled={isPending}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">Size *</label>
            <select id="size" name="size" className="w-full px-4 py-3 border rounded-lg disabled:bg-gray-100" required disabled={isPending}>
              <option value="">Select size</option>
              <option value='6"'>6</option>
              <option value='8"'>8</option>
              <option value='10"'>10</option>
              <option value='12"'>12</option>
            </select>
          </div>

          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image Path</label>
          <LoveInput id="image" name="image" type="text" placeholder="/images/cake.jpg" disabled={isPending} />
          <p className="text-sm text-gray-500 mt-1">Enter path like <code>/images/cake.jpg</code></p>

          <div className="flex gap-4 pt-4">
            <RomanticButton type="submit" className="flex-1">{isPending ? 'Creating...' : 'Create Product'}</RomanticButton>
            <Link href="/admin/products" className="btn btn-secondary flex-1 text-center">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
