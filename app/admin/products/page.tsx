'use client';

import React, { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminProductsSkeleton from '@/components/admin/AdminProductsSkeleton';
import ProductsList from '@/components/admin/ProductsList';

export default function AdminProductsPage() {
  return (
    <AdminLayout title="Products">
      <Suspense fallback={<AdminProductsSkeleton />}>
        <ProductsList />
      </Suspense>
    </AdminLayout>
  );
}
