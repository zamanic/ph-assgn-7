"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, formatPercent } from "@/lib/utils";

/**
 * Product Card — exact Penpot spec §5.4
 * Outer: 362.66 × 138, r=16, 1px base-300 stroke, bg base-100. NO shadow.
 * Card-body (inner): pad 16px all sides, col flex, row-gap 12px.
 * Row 1 (row-reverse layout, gap 12):
 *   LEFT (visual):  Product icon square 48×48, r=12, bg base-200 #F0F5F0
 *   RIGHT (visual): Name 16/600 + unit 12/400
 * Row 2 (align flex-end justify space-between):
 *   LEFT:  Price 16/600 + per/unit caption (12/400)
 *   RIGHT: Price Change Badge — h 24, r=12, pad 4/8, gap 4.
 *          ▲ red = error (#D03739) on error-content bg.
 *          ▼ green = success (#1A9951) on success-10 surface.
 *          — flat = base-200 surface + muted text.
 */
const ProductCard = ({ product }: { product: Product }) => {
  const up = product.changePercent > 0;
  const down = product.changePercent < 0;

  const badgeClass = up ? "is-up" : down ? "is-down" : "is-flat";
  const icon = up ? "▲" : down ? "▼" : "—";
  const sign = up ? "+" : down ? "-" : "";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card-penpot no-underline"
      aria-label={`${product.name} — আজকের দাম ${formatPrice(product.todayPrice)} টাকা`}
    >
      <div className="card-inner">
        {/* Row 1 — icon + name / unit. Row-reverse → icon left / name right visually */}
        <div
          className="flex flex-row-reverse items-center w-full"
          style={{ height: 48, columnGap: 12 }}
        >
          {/* Product icon square (visual left) */}
          <div className="card-icon-square" aria-hidden>
            <span className="text-2xl leading-none">{product.emoji}</span>
          </div>
          {/* Name + unit stack (visual right) */}
          <div className="flex flex-col flex-1 min-w-0">
            <h3
              className="m-0 line-clamp-1 text-[#1D271F]"
              style={{
                fontSize: 16,
                fontWeight: 600,
                lineHeight: 1.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={product.name}
            >
              {product.name}
            </h3>
            <p
              className="m-0"
              style={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 1.3333,
                color: "#1D271F",
                opacity: 0.7,
              }}
            >
              প্রতি {product.unit}
            </p>
          </div>
        </div>

        {/* Row 2 — price (left flex-end) + badge (right) */}
        <div
          className="flex items-end justify-between w-full"
          style={{ minHeight: 44 }}
        >
          {/* Price stack — left */}
          <div className="flex flex-col">
            <p
              className="m-0"
              style={{
                fontSize: 11,
                fontWeight: 500,
                lineHeight: 1.5,
                color: "#1D271F",
                opacity: 0.55,
              }}
            >
              আজকের দাম
            </p>
            <p
              className="m-0 text-[#05893E]"
              style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.5 }}
            >
              {formatPrice(product.todayPrice)}
              <span
                className="ml-1 text-[#1D271F]"
                style={{ fontSize: 12, fontWeight: 400, opacity: 0.6 }}
              >
                টাকা
              </span>
            </p>
          </div>

          {/* Price change badge — right */}
          <span className={`badge-penpot ${badgeClass}`}>
            <span aria-hidden style={{ fontSize: 11 }}>
              {icon}
            </span>
            <span>
              {sign}
              {formatPercent(product.changePercent)}%
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
