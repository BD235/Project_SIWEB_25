// components/admin/TransactionDetailView.tsx
'use client';

import Link from 'next/link';
import RomanticButton from '@/components/ui/RomanticButton';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { deleteTransaction } from '@/lib/transactionActions';
import { useRouter } from 'next/navigation';
import Alert from '@/components/ui/Alert';

interface Transaction {
  id_transaksi: number;
  id_customer: number;
  tanggal: string;
  total_revenue: number;
  status: string;
  formatted_date: string;
  iso_date: string;
}

interface TransactionDetailViewProps {
  transaction: Transaction;
}

export default function TransactionDetailView({ transaction }: TransactionDetailViewProps) {
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTransaction(transaction.id_transaksi);
      setAlert({
        type: 'success',
        message: 'Transaction deleted successfully! Redirecting...'
      });
      setTimeout(() => {
        router.push('/admin/transaction');
      }, 1000);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to delete transaction'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Completed': 'bg-green-100 text-green-800 border-green-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {status}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={4000}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/transaction" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Transactions
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/admin/transaction/${transaction.id_transaksi}/edit`}>
            <RomanticButton className="flex items-center gap-2">
              <PencilIcon className="w-4 h-4" />
              Edit
            </RomanticButton>
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Transaction Details Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Transaction #{transaction.id_transaksi}
            </h1>
            {getStatusBadge(transaction.status)}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transaction Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Information</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium text-gray-900">#{transaction.id_transaksi}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Customer ID:</span>
                  <span className="font-medium text-gray-900">{transaction.id_customer}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Transaction Date:</span>
                  <span className="font-medium text-gray-900">{transaction.formatted_date}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Status:</span>
                  <div>{getStatusBadge(transaction.status)}</div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h3>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {formatCurrency(transaction.total_revenue)}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(transaction.total_revenue)}
                  </span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Currency:</span>
                  <span className="font-medium text-gray-900">IDR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/admin/transaction/${transaction.id_transaksi}/edit`}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center transition-colors"
              >
                Edit Transaction
              </Link>
              <Link
                href="/admin/transaction"
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center transition-colors"
              >
                Back to List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
