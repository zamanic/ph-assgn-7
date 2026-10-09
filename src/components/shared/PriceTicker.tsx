"use client";

import { useApp } from "@/context/AppContext";
import { formatPrice, formatPercent, toBangla } from "@/lib/utils";
import Link from "next/link";

const PriceTicker = () => {
  const { products, loading } = useApp();

  if (loading || products.length === 0) {
    return (
      <div className="bg-base-100 border-b border-base-300 py-2 overflow-hidden">
        <div className="animate-pulse h-6 bg-base-200 rounded mx-auto w-full max-w-4xl" />
      </div>
    );
  }

  const displayProducts = products.length > 20 ? products.slice(0, 20) : products;

  const getChangeColor = (changePercent: number) => {
    if (changePercent > 0) return "text-success";
    if (changePercent < 0) return "text-error";
    return "text-base-content/60";
  };

  const getChangeIcon = (changePercent: number) => {
    if (changePercent > 0) return "▲";
    if (changePercent < 0) return "▼";
    return "—";
  };

  return (
    <div className="bg-base-100 border-b border-base-300 py-2 overflow-hidden">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap w-max">
          {[...displayProducts, ...displayProducts].map((product, idx) => (
            <Link
              key={`${product.id}-${idx}`}
              href={`/product/${product.slug}`}
              className="flex items-center gap-2 mx-4 hover:opacity-70 transition-opacity"
            >
              <span className="text-lg">{product.emoji}</span>
              <span className="text-sm font-medium">{product.name}</span>
              <span className="text-sm text-base-content/70">
                {formatPrice(product.todayPrice)} টাকা/{product.unit}
              </span>
              <span className={`text-sm font-semibold ${getChangeColor(product.changePercent)}`}>
                {getChangeIcon(product.changePercent)} {formatPercent(product.changePercent)}%
              </span>
              <span className="mx-2 text-base-content/30">|</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;
