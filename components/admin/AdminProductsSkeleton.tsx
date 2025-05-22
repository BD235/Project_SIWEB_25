export default function AdminProductsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-1/4 mb-6" />

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-rose-50">
            <tr>
              {['Product ID', 'Name', 'Price', 'Stock', 'Category'].map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left text-xs font-medium text-rose-800 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(6)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array(5)
                  .fill(0)
                  .map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

