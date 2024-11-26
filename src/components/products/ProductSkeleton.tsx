import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative pb-[100%]">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-4" />
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
        </div>
        <div className="flex justify-between">
          <div className="h-10 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-10 bg-gray-200 rounded-full animate-pulse w-10" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;