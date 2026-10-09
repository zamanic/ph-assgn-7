export default function GlobalLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="animate-pulse">
        <div className="h-48 w-full bg-base-300 rounded-2xl mb-10" />

        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 bg-base-300 rounded" />
          <div className="h-10 w-32 bg-base-300 rounded-lg" />
        </div>

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="shrink-0 h-12 w-28 bg-base-300 rounded-full"
            />
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-40 bg-base-300 rounded" />
          <div className="h-5 w-24 bg-base-300 rounded" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
            <div
              key={i}
              className="card bg-base-100 border border-base-300"
            >
              <div className="card-body p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 bg-base-300 rounded-lg" />
                  <div className="h-5 w-16 bg-base-300 rounded-full" />
                </div>
                <div className="h-5 w-3/4 bg-base-300 rounded mb-2" />
                <div className="h-3 w-16 bg-base-300 rounded mb-4" />
                <div className="h-4 w-12 bg-base-300 rounded mb-1" />
                <div className="flex items-end justify-between">
                  <div className="h-7 w-20 bg-base-300 rounded" />
                  <div className="space-y-1">
                    <div className="h-3 w-16 bg-base-300 rounded" />
                    <div className="h-3 w-16 bg-base-300 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
