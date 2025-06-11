'use client';

import { FaBell, FaUserCircle } from 'react-icons/fa';

export default function AdminNavbar({ title }: { title: string }) {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <div className="flex-1 px-4 flex justify-between items-center">
        {/* Judul di kiri */}
        <h1 className="text-lg font-semibold text-gray-700">{title}</h1>

        {/* Ikon Notifikasi dan Profil di kanan */}
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
            <span className="sr-only">View notifications</span>
            <FaBell className="h-6 w-6" />
          </button>
          <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
            <span className="sr-only">Open user menu</span>
            <FaUserCircle className="h-8 w-8 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
