'use client';

import React, { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminOrdersSkeleton from '@/components/admin/AdminOrdersSkeleton';
import OrdersList from '@/components/admin/OrdersList';

export default function AdminOrdersPage() {
  return (
    <AdminLayout title="Orders">
      <Suspense fallback={<AdminOrdersSkeleton />}>
        <OrdersList />
      </Suspense>
    </AdminLayout>
  );
}
