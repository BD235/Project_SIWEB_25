// components/ui/LogoLoading.tsx
'use client';

import Image from 'next/image';

export default function LogoLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin-slow w-24 h-24 relative">
        <Image
          src="/images/logo/logo.png"
          alt="Loading Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
