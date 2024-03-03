// ProductsSkeletonLoader.tsx
const SkeletonLoader = () => {
  return (
    <div className="border border-gray-200 shadow rounded-md max-w-sm w-full mx-auto">
      <div className="animate-pulse">
        <div className="bg-gray-300 h-48 w-full rounded-lg"></div> {/* Image */}
        <div className="p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Title */}
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div> {/* Description Line 1 */}
          <div className="h-4 bg-gray-300 rounded w-2/3"></div> {/* Description Line 2 */}
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="h-6 bg-gray-300 rounded w-24"></div> {/* Price */}
          <div className="h-6 bg-gray-300 rounded w-24"></div> {/* Button */}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

