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

  const category = categories.find((c) => c.slug === slug || c.name === slug);

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) => p.category === slug || p.categoryName === slug,
    );

    if (!category && result.length === 0) {
      const catMatch = categories.find(
        (c) =>
          c.name ===
          products.find((p) => p.category === slug || p.categoryName === slug)
            ?.categoryName,
      );
      if (catMatch) {
        result = products.filter(
          (p) =>
            p.category === catMatch.slug || p.categoryName === catMatch.name,
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
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/" className="btn-ghost-penpot !min-h-[36px] !px-3">
          <span aria-hidden>←</span>
          হোমে ফিরুন
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div
            className="shrink-0 flex items-center justify-center bg-[#F0F5F0]"
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              fontSize: 24,
            }}
          >
            {displayCategory?.icon || "📦"}
          </div>
          <div>
            <h1
              className="m-0 text-[#1D271F]"
              style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.3333 }}
            >
              {displayCategory?.name || "ক্যাটাগরি"}
            </h1>
            <p
              className="m-0 mt-1"
              style={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1.5,
                color: "#1D271F",
                opacity: 0.7,
              }}
            >
              মোট {filteredProducts.length} টি পণ্য
            </p>
          </div>
        </div>

        {hasItems && (
          <div className="flex items-center gap-3">
            <label
              htmlFor="cat-sort"
              className="text-[#1D271F]"
              style={{ fontSize: 14, fontWeight: 500, opacity: 0.75 }}
            >
              সাজান:
            </label>
            <select
              id="cat-sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="select select-bordered select-sm bg-[#FAFCFA] w-full md:w-56"
              style={{ borderRadius: 8, minHeight: 40 }}
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
        <div
          className="grid w-full"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            columnGap: 16,
            rowGap: 16,
          }}
        >
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
