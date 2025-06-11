'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteTransaction } from '@/lib/actions/transactionActions';
import Alert from '@/components/ui/Alert';
import Pagination from '@/components/ui/Pagination';
import TransactionsSkeleton from '@/components/admin/skeleton/TransactionsSkeleton';

interface Transaction {
  id_transaksi: number;
  nama_customer: string;
  jenis_produk: string;
  jumlah: number;
  total_revenue: number;
  formatted_date: string;
  status: string;
}

interface TransactionsListProps {
  query: string;
  currentPage: number;
}

export default function TransactionsList({ query, currentPage }: TransactionsListProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false
  });

  useEffect(() => {
    fetchTransactions();
  }, [query, currentPage]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '8'
      });

      if (query) {
        params.append('search', query);
      }

      const response = await fetch(`/api/transaction?${params}`);
      const data = await response.json();

      if (data.success) {
        setTransactions(data.data.transactions);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.error || 'Failed to fetch transactions');
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setAlert({
        type: 'error',
        message: 'Failed to fetch transactions'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      await deleteTransaction(id);
      setAlert({
        type: 'success',
        message: 'Transaction deleted successfully'
      });
      fetchTransactions(); // Refresh the list
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to delete transaction'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
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

  if (loading) {
    return <TransactionsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={4000}
        />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {transactions.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No transactions found.</p>
            {query && (
              <p className="mt-2">
                Try adjusting your search criteria or{' '}
                <Link href="/admin/transaction" className="text-pink-600 hover:text-pink-800">
                  clear the search
                </Link>
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id_transaksi} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{transaction.id_transaksi}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{transaction.nama_customer}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{transaction.jenis_produk}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{transaction.jumlah}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(transaction.total_revenue)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{transaction.formatted_date}</td>
                      <td className="px-6 py-4">{getStatusBadge(transaction.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <div key={transaction.id_transaksi} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Transaction #{transaction.id_transaksi}</span>
                    {getStatusBadge(transaction.status)}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between"><span>Customer:</span><span className="font-medium">{transaction.nama_customer}</span></div>
                    <div className="flex justify-between"><span>Product:</span><span className="font-medium">{transaction.jenis_produk}</span></div>
                    <div className="flex justify-between"><span>Qty:</span><span className="font-medium">{transaction.jumlah}</span></div>
                    <div className="flex justify-between"><span>Total Revenue:</span><span className="font-medium text-gray-900">{formatCurrency(transaction.total_revenue)}</span></div>
                    <div className="flex justify-between"><span>Date:</span><span className="font-medium">{transaction.formatted_date}</span></div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Link href={`/admin/transaction/${transaction.id_transaksi}`} className="text-blue-600 hover:text-blue-800 p-2 rounded" title="View Details"><EyeIcon className="w-4 h-4" /></Link>
                    <Link href={`/admin/transaction/${transaction.id_transaksi}/edit`} className="text-green-600 hover:text-green-800 p-2 rounded" title="Edit Transaction"><PencilIcon className="w-4 h-4" /></Link>
                    <button onClick={() => handleDelete(transaction.id_transaksi)} className="text-red-600 hover:text-red-800 p-2 rounded" title="Delete Transaction"><TrashIcon className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            baseUrl="/admin/transaction"
            searchParams={query ? { query } : {}}
          />
        </div>
      )}
    </div>
  );
}
