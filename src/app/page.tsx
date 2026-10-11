"use client";

import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import { useApp } from "@/context/AppContext";
import type { Product } from "@/types";

/**
 * Home page layout — exact Penpot spec §3.2 / §4.1
 * Main inner stack (1152 centered, vertical) sections vertical gap = 40 px).
 * Top → bottom visual order:
 *   1. Hero (banner)
 *   2. Price Movers 1 (▲ আজ দাম বেড়েছে) — 6 cards 3×2
 *   3. Price Movers 2 (▼ আজ দাম কমেছে) — 6 cards 3×2
 *   4. সব পণ্য — 33 cards 3×11 (All Products)
 * Padding on main stack = 24 / 16 / 24 / 16 (top/right/bottom/left)
 * Spacer above footer = 48 px.
 */

const SectionSkeleton = ({
  title,
  count = 6,
}: {
  title: string;
  count?: number;
}) => (
  <section className="mx-auto w-full max-w-[1152px] px-4">
    <div
      className="h-7 w-64 rounded bg-[#F0F5F0] animate-pulse"
      style={{ marginBottom: 12 }}
    />
    <div
      className="grid w-full animate-pulse"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        columnGap: 16,
        rowGap: 16,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA]"
          style={{ minHeight: 138 }}
        />
      ))}
    </div>
  </section>
);

const EmptySection = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => (
  <section className="mx-auto w-full max-w-[1152px] px-4">
    <h2
      className="font-bold text-[#1D271F]"
      style={{ fontSize: 20, lineHeight: 1.4 }}
    >
      {title}
    </h2>
    <div
      className="rounded-2xl border border-dashed border-[#E1E8E1] bg-[#FAFCFA] text-center"
      style={{ padding: 48, marginTop: 12, color: "#1D271FB3", fontSize: 14 }}
    >
      {message}
    </div>
  </section>
);

const HomeContent = () => {
  const { products, loading } = useApp();

  const risers: Product[] = [...products]
    .filter((p) => p.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 6);

  const fallers: Product[] = [...products]
    .filter((p) => p.changePercent < 0)
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 6);

  if (loading) {
    return (
      <div
        className="flex flex-col mx-auto w-full"
        style={{ rowGap: 40, padding: "24px 0" }}
      >
        <SectionSkeleton title="আজ দাম বেড়েছে ▲" count={6} />
        <SectionSkeleton title="আজ দাম কমেছে ▼" count={6} />
        <SectionSkeleton title="সব পণ্য" count={9} />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-full"
      style={{ rowGap: 40, padding: "24px 0" }}
    >
      {risers.length > 0 ? (
        <ProductSection
          title="আজ দাম বেড়েছে"
          icon="▲"
          iconColor="#D03739"
          products={risers}
        />
      ) : (
        <EmptySection
          title="আজ দাম বেড়েছে"
          message="আজকের জন্য কোনো দাম বাড়ানোর তথ্য পাওয়া যায়নি"
        />
      )}

      {fallers.length > 0 ? (
        <ProductSection
          title="আজ দাম কমেছে"
          icon="▼"
          iconColor="#1A9951"
          products={fallers}
        />
      ) : (
        <EmptySection
          title="আজ দাম কমেছে"
          message="আজকের জন্য কোনো দাম কমানোর তথ্য পাওয়া যায়নি"
        />
      )}

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${products.length}টি পণ্য দেখানো হচ্ছে`}
        products={products}
        sortable
      />
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero */}
      <div style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Hero />
      </div>

      {/* Sections stack:  Sections stack with vertical rowGap=40 */}
      <Suspense
        fallback={
          <div className="flex flex-col w-full" style={{ rowGap: 40 }}>
            <SectionSkeleton title="আজ দাম বেড়েছে ▲" count={6} />
            <SectionSkeleton title="আজ দাম কমেছে ▼" count={6} />
            <SectionSkeleton title="সব পণ্য" count={9} />
          </div>
        }
      >
        <HomeContent />
      </Suspense>

      {/* Spacer 48 px above Footer (§3.2 L110) */}
      <div style={{ height: 48 }} aria-hidden />
    </div>
  );
}
