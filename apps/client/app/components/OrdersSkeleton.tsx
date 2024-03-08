const OrdersSkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      {/* Loader for Order Title and Date */}
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/6"></div>
      </div>
      {/* Loader for Multiple Products */}
      {[1, 2].map((n) => (
        <div key={n} className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <div className="h-20 w-20 bg-gray-300 rounded"></div>
            <div className="ml-4 flex flex-col gap-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} className="h-5 w-5 bg-gray-300 rounded-full ml-1"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default OrdersSkeletonLoader
