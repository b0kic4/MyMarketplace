// components/ui/UniqueProductSkeletonLoader.tsx
import React from 'react';

const UniqueProductSkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="max-w-6xl px-4 mx-auto py-6">
        <div className="space-y-4">
          {/* Back button skeleton */}
          <div className="h-6 w-24 bg-gray-300 rounded"></div>
          {/* Title skeleton */}
          <div className="h-8 w-full max-w-3xl bg-gray-300 rounded-md"></div>
          {/* Image skeleton */}
          <div className="h-64 w-full bg-gray-300 rounded-md"></div>
          {/* Thumbnails skeleton */}
          <div className="flex space-x-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-24 w-24 bg-gray-300 rounded-md"></div>
            ))}
          </div>
          {/* Details skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full max-w-xl bg-gray-300 rounded"></div>
            <div className="h-4 w-full max-w-md bg-gray-300 rounded"></div>
            <div className="h-4 w-full max-w-sm bg-gray-300 rounded"></div>
          </div>
          {/* Button skeleton */}
          <div className="h-10 w-32 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default UniqueProductSkeletonLoader;
