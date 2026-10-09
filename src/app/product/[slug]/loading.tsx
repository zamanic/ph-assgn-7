export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-5 w-24 bg-base-300 rounded" />
        </div>
        <div className="card bg-base-100 shadow-lg mb-8">
          <div className="card-body p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
              <div className="h-24 w-24 bg-base-300 rounded-2xl" />
              <div className="flex-1 space-y-3">
                <div className="h-8 w-2/3 bg-base-300 rounded" />
                <div className="h-4 w-full bg-base-300 rounded" />
                <div className="h-4 w-5/6 bg-base-300 rounded" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-20 bg-base-300 rounded-full" />
                  <div className="h-6 w-16 bg-base-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100">
              <div className="card-body p-4">
                <div className="h-3 w-16 bg-base-300 rounded mb-2" />
                <div className="h-7 w-24 bg-base-300 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-base-100">
          <div className="card-body p-6">
            <div className="h-6 w-56 bg-base-300 rounded mb-6" />
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div className="h-4 w-32 bg-base-300 rounded" />
                  <div className="h-5 w-20 bg-base-300 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
