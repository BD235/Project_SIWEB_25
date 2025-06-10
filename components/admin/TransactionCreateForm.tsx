'use client';

import { useState, useTransition } from 'react';
import { createTransaction } from '@/lib/transactionActions';
import RomanticButton from '@/components/ui/RomanticButton';
import LoveInput from '@/components/ui/LoveInput';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Alert from '@/components/ui/Alert';

export default function TransactionCreateForm() {
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setAlert(null);

    startTransition(async () => {
      try {
        await createTransaction(formData);
        setAlert({ type: 'success', message: 'Transaction created successfully! Redirecting...' });
        setTimeout(() => {
          router.push('/admin/transaction');
        }, 1000);
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
          duration={4000}
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
            <p className="text-sm text-gray-500 mt-1">
              Enter the name of the customer for this transaction
            </p>
          </div>

          <div>
            <label htmlFor="total_revenue" className="block text-sm font-medium text-gray-700 mb-2">
              Total Revenue (Rp) *
            </label>
            <LoveInput
              id="total_revenue"
              name="total_revenue"
              type="number"
              placeholder="0"
              required
              disabled={isPending}
            />
            <p className="text-sm text-gray-500 mt-1">Enter the total amount for this transaction</p>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              id="status"
              name="status"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
              disabled={isPending}
              defaultValue="Pending"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Select the current status of the transaction
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <RomanticButton type="submit" className="flex-1" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Transaction'}
            </RomanticButton>
            <Link
              href="/admin/transaction"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-center text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
