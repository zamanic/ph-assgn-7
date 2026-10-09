"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice, formatPercent } from "@/lib/utils";

const ProductCard = ({ product }: { product: Product }) => {
  const getChangeStyles = () => {
    if (product.changePercent > 0) {
      return {
        badgeClass: "bg-success/10 text-success border-success/30",
        icon: "▲",
        sign: "+",
      };
    }
    if (product.changePercent < 0) {
      return {
        badgeClass: "bg-error/10 text-error border-error/30",
        icon: "▼",
        sign: "-",
      };
    }
    return {
      badgeClass: "bg-base-200 text-base-content/60 border-base-300",
      icon: "—",
      sign: "",
    };
  };

  const styles = getChangeStyles();

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-base-100 border border-base-300 hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer group overflow-hidden"
    >
      <div className="card-body p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
            {product.emoji}
          </div>
          <div
            className={`badge badge-sm border ${styles.badgeClass} px-2 py-1 text-xs font-semibold`}
          >
            <span className="mr-0.5">{styles.icon}</span>
            {styles.sign}
            {formatPercent(product.changePercent)}%
          </div>
        </div>

        <h3 className="card-title text-base font-semibold line-clamp-2 mb-1">
          {product.name}
        </h3>

        <p className="text-xs text-base-content/60 mb-3">
          প্রতি {product.unit}
        </p>

        <div className="mt-auto">
          <p className="text-xs text-base-content/50 mb-1">আজকের দাম</p>
          <div className="flex items-end justify-between">
            <p className="text-xl font-bold text-primary">
              {formatPrice(product.todayPrice)}
              <span className="text-sm font-normal text-base-content/60 ml-1">
                টাকা
              </span>
            </p>
            <div className="text-xs text-base-content/50 text-right">
              <p>
                সর্বনিম্ন: {formatPrice(product.minPrice)}
              </p>
              <p>
                সর্বোচ্চ: {formatPrice(product.maxPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
