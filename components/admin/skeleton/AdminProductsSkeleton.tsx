import React from 'react';

export default function AdminProductsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            {/* Table Body Skeleton */}
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {/* ID Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </td>
                  
                  {/* Name Column with Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* Product Image Skeleton */}
                      <div className="flex-shrink-0 h-12 w-12 mr-4">
                        <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
                      </div>
                      <div>
                        {/* Product Name */}
                        <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
                        {/* Product Description */}
                        <div className="h-3 bg-gray-200 rounded w-48"></div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Price Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  
                  {/* Stock Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="inline-flex px-2 py-1 bg-gray-200 rounded-full">
                      <div className="h-3 bg-gray-300 rounded w-12"></div>
                    </div>
                  </td>
                  
                  {/* Category Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="inline-flex px-2 py-1 bg-gray-200 rounded-full">
                      <div className="h-3 bg-gray-300 rounded w-16"></div>
                    </div>
                  </td>
                  
                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {/* Edit Button Skeleton */}
                      <div className="p-2 bg-gray-200 rounded-md w-9 h-9 flex items-center justify-center">
                        <div className="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                      {/* Delete Button Skeleton */}
                      <div className="p-2 bg-gray-200 rounded-md w-9 h-9 flex items-center justify-center">
                        <div className="w-5 h-5 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          
          {/* Page Numbers */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 rounded"></div>
          ))}
          
          {/* Next Button */}
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}