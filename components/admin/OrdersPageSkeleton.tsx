export default function OrdersPageSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="h-8 w-48 bg-gray-200 rounded" />

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search input */}
          <div className="w-full sm:w-64 h-10 bg-gray-200 rounded" />
          {/* Filter dropdown */}
          <div className="w-40 h-10 bg-gray-200 rounded" />
          {/* Export button */}
          <div className="w-32 h-10 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Table section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-rose-50">
              <tr>
                {['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Action'].map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(6)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(6)].map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
