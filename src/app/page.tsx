"use client";

import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import ProductSection from "@/components/home/ProductSection";
import { SkeletonGrid } from "@/components/shared/SkeletonCard";
import { useApp } from "@/context/AppContext";
import type { Product } from "@/types";

const SectionSkeleton = ({
  title,
  subtitle,
  count = 6,
}: {
  title: string;
  subtitle?: string;
  count?: number;
}) => (
  <section className="py-10 md:py-14">
    <div className="container mx-auto px-4">
      <div className="mb-6 md:mb-10 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content mb-2 md:mb-3 animate-pulse">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base text-base-content/60 max-w-2xl mx-auto animate-pulse">
            {subtitle}
          </p>
        )}
      </div>
      <SkeletonGrid count={count} />
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
  <section className="py-10 md:py-14">
    <div className="container mx-auto px-4">
      <div className="mb-6 md:mb-10 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content">
          {title}
        </h2>
      </div>
      <div className="text-center py-12 text-base-content/60">{message}</div>
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
      <>
        <SectionSkeleton title="আজ দাম বেড়েছে ▲" count={6} />
        <SectionSkeleton title="আজ দাম কমেছে ▼" count={6} />
        <SectionSkeleton
          title="সব পণ্য"
          subtitle="সকল পণ্যের আজকের বাজার দাম"
          count={8}
        />
      </>
    );
  }

  return (
    <>
      {risers.length > 0 ? (
        <ProductSection title="আজ দাম বেড়েছে ▲" products={risers} />
      ) : (
        <EmptySection
          title="আজ দাম বেড়েছে ▲"
          message="আজকের জন্য কোনো দাম বাড়ানোর তথ্য পাওয়া যায়নি"
        />
      )}

      {fallers.length > 0 ? (
        <ProductSection title="আজ দাম কমেছে ▼" products={fallers} />
      ) : (
        <EmptySection
          title="আজ দাম কমেছে ▼"
          message="আজকের জন্য কোনো দাম কমানোর তথ্য পাওয়া যায়নি"
        />
      )}

      <ProductSection
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="সকল পণ্যের আজকের বাজার দাম"
        products={products}
      />
    </>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Suspense
        fallback={
          <>
            <SectionSkeleton title="আজ দাম বেড়েছে ▲" count={6} />
            <SectionSkeleton title="আজ দাম কমেছে ▼" count={6} />
            <SectionSkeleton
              title="সব পণ্য"
              subtitle="সকল পণ্যের আজকের বাজার দাম"
              count={8}
            />
          </>
        }
      >
        <HomeContent />
      </Suspense>
    </div>
  );
}
