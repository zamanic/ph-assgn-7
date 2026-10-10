"use client";

import { useMemo, useState, useEffect, use } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import type { SortOption } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import LoadingSkeleton from "./loading";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Next.js 16+: params is a Promise — unwrap synchronously
  const { slug } = use(params);
  const { products, categories, loading } = useApp();
  const [sortOption, setSortOption] = useState<SortOption>("default");

  useEffect(() => {
    setSortOption("default");
  }, [slug]);

  const category = categories.find(
    (c) => c.slug === slug || c.name === slug
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) => p.category === slug || p.categoryName === slug
    );

    if (!category && result.length === 0) {
      const catMatch = categories.find(
        (c) =>
          c.name ===
          products.find(
            (p) => p.category === slug || p.categoryName === slug
          )?.categoryName
      );
      if (catMatch) {
        result = products.filter(
          (p) => p.category === catMatch.slug || p.categoryName === catMatch.name
        );
      }
    }

    switch (sortOption) {
      case "price-asc":
        result = [...result].sort((a, b) => a.todayPrice - b.todayPrice);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.todayPrice - a.todayPrice);
        break;
      default:
        break;
    }

    return result;
  }, [products, categories, slug, sortOption, category]);

  const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

  if (loading) {
    return <LoadingSkeleton />;
  }

  const displayCategory =
    category ||
    (filteredProducts.length > 0
      ? {
          name: filteredProducts[0].categoryName,
          icon: "📦",
          slug,
          id: slug,
        }
      : null);

  const hasItems = filteredProducts.length > 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <Link
          href="/"
          className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content"
        >
          <span>←</span>
          হোমে ফিরুন
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 flex items-center justify-center text-3xl bg-primary/10 rounded-xl">
            {displayCategory?.icon || "📦"}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {displayCategory?.name || "ক্যাটাগরি"}
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              মোট {filteredProducts.length} টি পণ্য
            </p>
          </div>
        </div>

        {hasItems && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-base-content/70">
              সাজান:
            </label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="select select-bordered select-sm bg-base-100 w-full md:w-56"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {hasItems ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 border-2 border-dashed border-base-300">
          <div className="card-body items-center text-center py-20">
            <div className="text-7xl mb-6">🔍</div>
            <h2 className="card-title text-2xl text-error mb-3">
              পেজটি পাওয়া যায়নি
            </h2>
            <p className="text-base-content/60 mb-8 max-w-md">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি। অন্য ক্যাটাগরি দেখুন অথবা
              হোম পেজে ফিরে যান।
            </p>
            <Link href="/" className="btn btn-primary btn-lg">
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
