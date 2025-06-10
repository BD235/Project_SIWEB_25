// app/admin/transaction/page.tsx
'use client';

import React, { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import TransactionsList from '@/components/admin/TransactionsList';
import SearchInput from '@/components/ui/SearchInput';
import RomanticButton from '@/components/ui/RomanticButton';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AdminTransactionPage() {
  return (
    <AdminLayout title="Transaction Management">
      <div className="w-full">
        {/* Header */}
        <div className="flex w-full items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          </div>

          {/* Add Transaction Button */}
          <Link href="/admin/transaction/create">
            <RomanticButton className="flex items-center gap-2">
              <PlusIcon className="w-4 h-4" />
              Add Transaction
            </RomanticButton>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchInput placeholder="Search transactions by ID, customer ID, status, or amount..." />
        </div>

        {/* Transactions List */}
        <Suspense fallback={<TransactionsSkeleton />}>
          <TransactionsListWrapper />
        </Suspense>
      </div>
    </AdminLayout>
  );
}

function TransactionsListWrapper() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  return <TransactionsList query={query} currentPage={currentPage} />;
}

function TransactionsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    </div>
  );
}