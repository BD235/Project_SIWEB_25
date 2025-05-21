'use client';

import { CardsSkeleton } from '@/components/ui/skeletons/card-skeleton';

export default function Loading() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CardsSkeleton />
    </div>
  );
}
