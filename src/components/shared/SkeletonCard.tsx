"use client";

const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 border border-base-300 overflow-hidden animate-pulse">
      <div className="card-body p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="w-12 h-12 bg-base-200 rounded-lg" />
          <div className="w-16 h-6 bg-base-200 rounded-full" />
        </div>
        <div className="w-3/4 h-5 bg-base-200 rounded mb-1" />
        <div className="w-1/2 h-4 bg-base-200 rounded mb-3" />
        <div className="w-1/3 h-3 bg-base-200 rounded mb-4" />
        <div className="mt-auto">
          <div className="w-1/3 h-3 bg-base-200 rounded mb-2" />
          <div className="flex items-end justify-between">
            <div className="w-1/2 h-7 bg-base-200 rounded" />
            <div className="space-y-1">
              <div className="w-20 h-3 bg-base-200 rounded" />
              <div className="w-20 h-3 bg-base-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonCard;
