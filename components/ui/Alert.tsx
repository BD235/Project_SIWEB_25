'use client';

import { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
  duration?: number; // dalam ms, default 3000
}

export default function Alert({ type, message, onClose, duration = 3000 }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm px-4 py-3 rounded shadow-lg
        flex items-center gap-3
        text-white font-semibold
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
        animate-slideIn
      `}
      role="alert"
    >
      {type === 'success' ? (
        <CheckCircleIcon className="w-6 h-6" />
      ) : (
        <XCircleIcon className="w-6 h-6" />
      )}

      <span className="flex-1">{message}</span>

      {/* Tombol close */}
      <button
        onClick={onClose}
        className="text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close alert"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
