export default function SkeletonCard() {
  return (
    <div className="bg-gray-200 animate-pulse p-5 rounded-xl shadow">
      <div className="h-5 w-1/3 bg-gray-300 rounded mb-3"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
    </div>
  );
}
