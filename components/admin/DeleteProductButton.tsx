'use client';

import React, { useState, useTransition } from 'react';
import Alert from '@/components/ui/Alert';

interface DeleteProductButtonProps {
  id: number;
  onDeleted?: () => void; // opsional callback untuk refresh list dari parent
}

export default function DeleteProductButton({ id, onDeleted }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    startTransition(async () => {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to delete product');
        }

        setAlert({ type: 'success', message: 'Product deleted successfully!' });

        // Jika parent ingin refresh list, panggil callbacknya
        if (onDeleted) onDeleted();

        // Atau kalau ingin reload halaman bisa pakai ini
        // setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        setAlert({
          type: 'error',
          message: error instanceof Error ? error.message : 'Failed to delete product',
        });
      }
    });
  }

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={4000}
        />
      )}

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-600 hover:underline disabled:text-red-300"
        aria-label={`Delete product ${id}`}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </>
  );
}
