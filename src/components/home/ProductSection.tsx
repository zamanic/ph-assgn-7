"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import ProductCard from "@/components/shared/ProductCard";

/**
 * Product section wrapper — exact Penpot spec vertical layout constants
 * Section order: Title row (left aligned, h=28, gap 8)  then spacer 12px, then grid.
 * Section vertical gap between sibling sections: 40px (handled by page-level container via gap).
 * Grid columns = 3 on lg (card width 362.66 × 3 + 2×16 gap = 1120).
 * Grid row gap = 16 px, col gap = 16 px.
 * Section titles = 20/700 LH 28 (style index 7 from typographies scale).
 */
interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
  /** Optional leading icon (e.g. ▲ / ▼) rendered before the title with a custom color. */
  icon?: string;
  iconColor?: string;
  /** When true, shows a sort dropdown (ডিফল্ট / দাম কম→বেশি / দাম বেশি→কম). */
  sortable?: boolean;
}

const ProductSection = ({
  title,
  subtitle,
  products,
  id,
  icon,
  iconColor,
  sortable = false,
}: ProductSectionProps) => {
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">(
    "default",
  );

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === "price-asc") arr.sort((a, b) => a.todayPrice - b.todayPrice);
    if (sort === "price-desc") arr.sort((a, b) => b.todayPrice - a.todayPrice);
    return arr;
  }, [products, sort]);

  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[1152px] px-4 scroll-mt-32"
    >
      {/* Section header — row of icon+title with 8px inner gap */}
      <div
        className="w-full flex items-center justify-between flex-wrap gap-2"
        style={{ columnGap: 8, minHeight: 28 }}
      >
        <div className="flex items-center" style={{ columnGap: 8 }}>
          {icon && (
            <span
              aria-hidden
              style={{
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.4,
                color: iconColor || "#1D271F",
              }}
            >
              {icon}
            </span>
          )}
          <h2
            className="m-0 text-[#1D271F]"
            style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.4 }}
          >
            {title}
          </h2>
        </div>

        {sortable && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="home-sort"
              className="text-[#1D271F]"
              style={{ fontSize: 14, fontWeight: 500, opacity: 0.6, lineHeight: 1 }}
            >
              সাজান
            </label>
            <select
              id="home-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="select select-bordered select-sm bg-white text-[#1D271F] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              style={{ fontSize: 13, minHeight: 36 }}
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        )}
      </div>

      {subtitle && (
        <p
          className="m-0 mt-2"
          style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#1D271F",
            opacity: 0.7,
          }}
        >
          {subtitle}
        </p>
      )}

      {/* Title → grid gap = 12 px (§4.1) */}
      <div style={{ height: 12 }} aria-hidden />

      {/* Grid: gap 16 × 16, responsive cols 1 → sm 2 → lg 3 (1120 / 3 ≈ 362.66 per §5.5) */}
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          columnGap: 16,
          rowGap: 16,
        }}
      >
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
