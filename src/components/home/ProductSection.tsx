"use client";

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
}

const ProductSection = ({
  title,
  subtitle,
  products,
  id,
}: ProductSectionProps) => {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-[1152px] px-4 scroll-mt-32"
    >
      {/* Section header — row of icon+title with 8px inner gap */}
      <div
        className="w-full flex items-center"
        style={{ columnGap: 8, minHeight: 28 }}
      >
        <h2
          className="m-0 text-[#1D271F]"
          style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.4 }}
        >
          {title}
        </h2>
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
