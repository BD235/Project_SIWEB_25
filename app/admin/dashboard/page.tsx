// app/admin/dashboard/page.tsx

'use client';

import React, { Suspense } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboardSkeleton from '@/components/admin/AdminDashboardSkeleton';
import AnalyticMetrics from '@/components/admin/AnalyticMetrics';

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <AnalyticMetrics />
      </Suspense>
    </AdminLayout>
  );
}
  