/**
 * Global loading page — shown during client-side navigation between routes
 * that don't have their own loading.tsx. A lightweight centered spinner
 * with the brand primary color and a subtle pulse animation.
 */
export default function GlobalLoading() {
  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ minHeight: "60vh", padding: "40px 16px" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div
          aria-label="লোড হচ্ছে"
          role="status"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "3px solid #E1E8E1",
            borderTopColor: "#05893E",
            animation: "spin-loader 0.8s linear infinite",
          }}
        />
        <p
          className="m-0"
          style={{
            fontSize: 14,
            color: "#1D271F",
            animation: "pulse-loader 1.4s ease-in-out infinite",
          }}
        >
          লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
}
