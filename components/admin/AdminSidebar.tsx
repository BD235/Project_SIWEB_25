'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaBirthdayCake, 
  FaShoppingCart, 
  FaUsers, 
  FaCog,
  FaSignOutAlt 
} from 'react-icons/fa';

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 fixed h-full">
        <div className="flex-1 flex flex-col min-h-0 bg-rose-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-white text-3xl font-bold font-romantic">Sweet Love Admin</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <Link
                href="/admin/dashboard"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('dashboard') ? 'bg-rose-900 text-white' : 'text-rose-200 hover:bg-rose-700 hover:text-white'}`}
              >
                <FaHome className={`mr-3 flex-shrink-0 ${isActive('dashboard') ? 'text-white' : 'text-rose-300'}`} />
                Dashboard
              </Link>
              
              <Link
                href="/admin/products"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('products') ? 'bg-rose-900 text-white' : 'text-rose-200 hover:bg-rose-700 hover:text-white'}`}
              >
                <FaBirthdayCake className={`mr-3 flex-shrink-0 ${isActive('products') ? 'text-white' : 'text-rose-300'}`} />
                Products
              </Link>
              
              <Link
                href="/admin/transaction"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive('transaction') ? 'bg-rose-900 text-white' : 'text-rose-200 hover:bg-rose-700 hover:text-white'}`}
              >
                <FaShoppingCart className={`mr-3 flex-shrink-0 ${isActive('orders') ? 'text-white' : 'text-rose-300'}`} />
                Transactions
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-rose-700 p-4">
            <a
              href="/auth/login"
              className="flex-shrink-0 w-full group block"
            >
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin123</p>
                  <p className="text-xs font-medium text-rose-200 group-hover:text-white">
                    <span className="flex items-center">
                      <FaSignOutAlt className="mr-1" /> Sign out
                    </span>
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}