"use client";

/**
 * SkeletonCard — matches EXACT penpot product card dimensions:
 * 138h, r=16, 1px base-300 stroke, base-100 bg. 16 px inner pad.
 * Row 1 (48 px tall): icon (48×48 r=12) + name (53×40 stack)
 * Row 2 (44 px tall): price left + badge right (h=24 r=12)
 * + Skeleton Grid: 16px gaps, responsive cols 1/2/3 (max 3 at lg).
 */
const SkeletonCard = () => {
  return (
    <div
      className="w-full animate-pulse"
      style={{
        minHeight: 138,
        padding: 1,
        borderRadius: 16,
        background: "#E1E8E1",
      }}
    >
      <div
        className="w-full h-full flex flex-col bg-[#FAFCFA]"
        style={{
          padding: 16,
          borderRadius: 15,
          rowGap: 12,
        }}
      >
        {/* Row 1: icon 48×48 + name stack */}
        <div
          className="flex flex-row-reverse items-center w-full"
          style={{ columnGap: 12, height: 48 }}
        >
          <div
            className="shrink-0"
            style={{ width: 48, height: 48, borderRadius: 12, background: "#F0F5F0" }}
          />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-5 rounded bg-[#F0F5F0] w-3/5" />
            <div className="h-4 rounded bg-[#F0F5F0] w-2/5" />
          </div>
        </div>
        {/* Row 2: price 67.2×44 + badge 63×24 */}
        <div
          className="flex items-end justify-between w-full"
          style={{ minHeight: 44 }}
        >
          <div className="flex flex-col gap-1">
            <div className="h-4 rounded bg-[#F0F5F0] w-16" />
            <div className="h-6 rounded bg-[#F0F5F0] w-20" />
          </div>
          <div
            className="rounded-full bg-[#F0F5F0]"
            style={{ minWidth: 63, height: 24 }}
          />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 8 }: { count?: number }) => {
  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        columnGap: 16,
        rowGap: 16,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonCard;
