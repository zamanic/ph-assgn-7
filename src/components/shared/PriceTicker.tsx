"use client";

import { useApp } from "@/context/AppContext";
import { formatPrice, formatPercent } from "@/lib/utils";
import Link from "next/link";

/**
 * Price Ticker / Marquee — exact Penpot spec §5.2
 * Outer height 37px, base-100 bg, TOP + BOTTOM 1px base-300 stroke.
 * Track width: flex w-max for marquee.
 * Item: h 36, padding 8/17/8/16, gap 6, item separator (right border 1× base-200).
 * Font: 12/500 base-content.
 */
const PriceTicker = () => {
  const { products, loading } = useApp();

  if (loading || products.length === 0) {
    return (
      <div className="ticker-outer flex items-center">
        <div className="animate-pulse h-6 bg-[#F0F5F0] rounded mx-auto w-full max-w-4xl" />
      </div>
    );
  }

  // Penpot: marquee animation (copy items twice for seamless translate-X -50%)
  const displayProducts =
    products.length > 20 ? products.slice(0, 20) : products;

  return (
    <div className="ticker-outer relative">
      <div className="flex animate-marquee whitespace-nowrap w-max h-full">
        {[...displayProducts, ...displayProducts].map((product, idx) => {
          const up = product.changePercent > 0;
          const down = product.changePercent < 0;
          const color = up ? "#D03739" : down ? "#1A9951" : "#1D271FB3";
          const icon = up ? "▲" : down ? "▼" : "—";
          const sign = up ? "+" : down ? "-" : "";
          return (
            <Link
              key={`${product.id}-${idx}`}
              href={`/product/${product.slug}`}
              className="ticker-item hover:opacity-80 transition-opacity text-decoration-none"
            >
              <span style={{ fontSize: 14 }} aria-hidden>
                {product.emoji}
              </span>
              <span
                className="font-medium text-[#1D271F]"
                style={{ fontSize: 12 }}
              >
                {product.name}
              </span>
              <span
                className="text-[#1D271F]"
                style={{ fontSize: 12, opacity: 0.7 }}
              >
                {formatPrice(product.todayPrice)} টাকা/
                {product.unit}
              </span>
              <span style={{ color, fontSize: 12, fontWeight: 600 }}>
                {icon} {sign}
                {formatPercent(product.changePercent)}%
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PriceTicker;
