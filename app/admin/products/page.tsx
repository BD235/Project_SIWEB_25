// app/admin/products/page.tsx
'use client';

import React, { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminProductsSkeleton from '@/components/admin/AdminProductsSkeleton';
import ProductsList from '@/components/admin/ProductsList';
import SearchInput from '@/components/ui/SearchInput';
import Pagination from '@/components/ui/Pagination';
import { useSearchParams } from 'next/navigation';

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <div className="w-full">
        {/* Header */}
        <div className="flex w-full items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <SearchInput placeholder="Search products by name, category, or description..." />
        </div>
        
        {/* Products List with Suspense */}
        <Suspense fallback={<AdminProductsSkeleton />}>
          <ProductsListWrapper />
        </Suspense>
      </div>
    </AdminLayout>
  );
}

// Wrapper component to handle search params
function ProductsListWrapper() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  return (
    <>
      <ProductsList query={query} currentPage={currentPage} />
      <PaginationWrapper query={query} />
    </>
  );
}

function PaginationWrapper({ query }: { query: string }) {
  // This would need to be fetched from an API or passed as prop
  // For now, we'll add it to ProductsList component
  return null;
}