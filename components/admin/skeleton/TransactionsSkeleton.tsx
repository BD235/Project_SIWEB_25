export default function TransactionsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Desktop Table Skeleton */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards Skeleton */}
        <div className="md:hidden divide-y divide-gray-200">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="p-4 space-y-3 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-14"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                  <div className="h-3 bg-gray-200 rounded w-6"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-28"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="h-10 w-20 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
          <div className="h-10 w-10 bg-gray-200 rounded"></div>
          <div className="h-10 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Stats Text Skeleton */}
      <div className="text-center animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
      </div>
    </div>
  );
}