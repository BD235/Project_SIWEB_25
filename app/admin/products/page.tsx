// ===== FIXED: app/admin/products/page.tsx =====
'use client';

import React, { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminProductsSkeleton from '@/components/admin/skeleton/AdminProductsSkeleton';
import ProductsList from '@/components/admin/ProductsList';
import SearchInput from '@/components/ui/SearchInput';
import RomanticButton from '@/components/ui/RomanticButton';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AdminProductsPage() {
  return (
    <AdminLayout title="Product Management">
      <div className="w-full">
        {/* Header */}
      <div className="flex items-center justify-between mb-6 pd-4">
        {/* Search Bar di sebelah kiri */}
        <SearchInput placeholder="Search products...." />

        {/* Add Product Button di sebelah kanan */}
        <Link href="/admin/products/create" className="ml-4">
          <RomanticButton className="flex items-center gap-2">
            Add Product
          </RomanticButton>
        </Link>
      </div>

        {/* Products List */}
        <Suspense fallback={<AdminProductsSkeleton />}>
          <ProductsListWrapper />
        </Suspense>
      </div>
    </AdminLayout>
  );
}

function ProductsListWrapper() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  return <ProductsList query={query} currentPage={currentPage} />;
}
