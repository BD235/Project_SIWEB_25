'use client';

import { useState, useTransition } from 'react';
import RomanticButton from '@/components/ui/RomanticButton';
import LoveInput from '@/components/ui/LoveInput';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Alert from '@/components/ui/Alert';
import { createTransaction } from '@/lib/actions/transactionActions';

// Updated Product type to match your database structure
type Product = {
  id: number;           // Changed from id_product (string) to id (number)
  name: string;         // Changed from nama_product to name to match API
  price: number;        // Changed from harga to price to match database
};

export default function TransactionCreateForm({ products }: { products: Product[] }) {
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [hargaSatuan, setHargaSatuan] = useState(0);
  const [qty, setQty] = useState(1);
  const totalRevenue = qty * hargaSatuan;

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value ? parseInt(e.target.value) : '';
    setSelectedProductId(id);

    if (id) {
      const selectedProduct = products.find((p) => p.id === id);
      if (selectedProduct) {
        setHargaSatuan(selectedProduct.price);
      } else {
        setHargaSatuan(0);
      }
    } else {
      setHargaSatuan(0);
    }
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Math.max(1, parseInt(e.target.value) || 1);
    setQty(newQty);
  };

  async function handleSubmit(formData: FormData) {
    setAlert(null);
    
    // Validate required fields
    if (!selectedProductId) {
      setAlert({ type: 'error', message: 'Please select a product' });
      return;
    }

    startTransition(async () => {
      try {
        // Set calculated values
        formData.set('total_revenue', totalRevenue.toString());
        formData.set('harga_satuan', hargaSatuan.toString());
        formData.set('id_produk', selectedProductId.toString());

        await createTransaction(formData);
        setAlert({ type: 'success', message: 'Transaction created successfully! Redirecting...' });
        setTimeout(() => {
          router.push('/admin/transaction');
        }, 1500);
      } catch (err) {
        setAlert({
          type: 'error',
          message: err instanceof Error ? err.message : 'Failed to create transaction',
        });
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={5000}
        />
      )}

      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/transaction"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Transactions
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Transaction</h2>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nama_customer" className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <LoveInput
              id="nama_customer"
              name="nama_customer"
              type="text"
              placeholder="Enter customer name"
              required
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="id_produk" className="block text-sm font-medium text-gray-700 mb-2">
              Product *
            </label>
            <select
              id="id_produk"
              name="id_produk"
              required
              disabled={isPending}
              onChange={handleProductChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={selectedProductId}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <LoveInput
              id="qty"
              name="qty"
              type="number"
              inputMode="numeric"
              placeholder="1"
              value={qty}
              min={1}
              required
              onChange={handleQtyChange}
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="harga_satuan_display" className="block text-sm font-medium text-gray-700 mb-2">
              Price per Unit *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                Rp
              </span>
              <input
                id="harga_satuan_display"
                type="text"
                value={hargaSatuan.toLocaleString('id-ID')}
                readOnly
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
            <input
              type="hidden"
              name="harga_satuan"
              value={hargaSatuan}
            />
          </div>

          <div>
            <label htmlFor="total_revenue_display" className="block text-sm font-medium text-gray-700 mb-2">
              Total Revenue *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                Rp
              </span>
              <input
                id="total_revenue_display"
                type="text"
                value={totalRevenue.toLocaleString('id-ID')}
                readOnly
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed font-semibold"
              />
            </div>
            <input
              type="hidden"
              name="total_revenue"
              value={totalRevenue}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              required
              disabled={isPending}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              defaultValue="Pending"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <RomanticButton 
              type="submit" 
              className="flex-1" 
              disabled={isPending || !selectedProductId}
            >
              {isPending ? 'Creating Transaction...' : 'Create Transaction'}
            </RomanticButton>
            <Link
              href="/admin/transaction"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-center text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}