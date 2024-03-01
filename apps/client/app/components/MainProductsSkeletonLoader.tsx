// ProductsSkeletonLoader.tsx
const SkeletonLoader = () => {
  return (
    <div className="border border-gray-200 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col space-y-2"> {/* Adjusted space-y-4 to space-y-2 */}
        <div className="rounded-lg bg-gray-300 h-48 w-full"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-1">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

