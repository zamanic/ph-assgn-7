"use client";

import type { Product } from "@/types";
import ProductCard from "@/components/shared/ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  id?: string;
}

const ProductSection = ({ title, subtitle, products, id }: ProductSectionProps) => {
  return (
    <section id={id} className="py-10 md:py-14 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-10 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-base-content mb-2 md:mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm md:text-base text-base-content/60 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
