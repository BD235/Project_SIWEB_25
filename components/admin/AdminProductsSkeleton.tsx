export default function AdminProductsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded mb-4 w-1/3"></div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}
