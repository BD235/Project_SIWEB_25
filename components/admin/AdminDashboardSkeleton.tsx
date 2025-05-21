export default function AdminDashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-28 rounded-xl"></div>
        ))}
      </div>
      <div className="bg-gray-200 h-64 rounded-xl mb-8"></div>
      <div className="bg-gray-200 h-64 rounded-xl"></div>
    </div>
  );
}
