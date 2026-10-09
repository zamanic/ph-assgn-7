"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { API_BASE, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import LoadingSkeleton from "./loading";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: session, isPending: sessionPending } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionPending) return;
    if (!session) {
      const callbackUrl = encodeURIComponent(`/product/${params.slug}`);
      toast.error("এই পেজ দেখতে লগইন করুন");
      router.replace(`/signin?callbackUrl=${callbackUrl}`);
      return;
    }

    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
        if (!res.ok) throw new Error("ডেটা লোড করতে সমস্যা হয়েছে");
        const products: Product[] = await res.json();
        const found = products.find((p) => p.slug === params.slug);
        if (!found) {
          setError("পণ্যটি পাওয়া যায়নি");
        } else {
          setProduct(found);
        }
      } catch (err) {
        setError("ডেটা লোড করতে সমস্যা হয়েছে");
        toast.error("ডেটা লোড করতে সমস্যা হয়েছে");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [session, sessionPending, params.slug, router]);

  if (sessionPending || loading) {
    return <LoadingSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h1 className="text-3xl font-bold text-error mb-4">
          {error || "পণ্যটি পাওয়া যায়নি"}
        </h1>
        <Link
          href="/"
          className="btn btn-primary btn-lg mt-6"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const priceSummary = [
    { label: "সর্বনিম্ন দাম", value: product.minPrice, color: "text-success" },
    { label: "সর্বোচ্চ দাম", value: product.maxPrice, color: "text-error" },
    { label: "গড় দাম", value: product.avgPrice, color: "text-info" },
    { label: "আজকের দাম", value: product.todayPrice, color: "text-primary" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link
          href="/"
          className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content"
        >
          <span>←</span>
          হোমে ফিরুন
        </Link>
      </div>

      <div className="card bg-base-100 shadow-lg mb-8 overflow-hidden">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
            <div className="h-24 w-24 flex items-center justify-center text-6xl bg-primary/10 rounded-2xl shrink-0">
              {product.emoji}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-base-content/70 mb-4 leading-relaxed">
                {product.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="badge badge-primary badge-sm px-3 py-1.5">
                  {product.categoryName}
                </span>
                <span className="badge badge-outline badge-sm px-3 py-1.5">
                  প্রতি {product.unit}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {priceSummary.map((item) => (
          <div
            key={item.label}
            className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="card-body p-4">
              <p className="text-xs text-base-content/60 mb-1">{item.label}</p>
              <p className={`text-xl md:text-2xl font-bold ${item.color}`}>
                ৳ {formatPrice(item.value)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow-lg overflow-hidden">
        <div className="card-body p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>🏪</span>
            বাজারভিত্তিক আজকের দাম
          </h2>

          {product.prices && product.prices.length > 0 ? (
            <div className="divide-y divide-base-200">
              {product.prices.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-4 px-2 hover:bg-base-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                      🛒
                    </div>
                    <div>
                      <p className="font-semibold">{item.bazar}</p>
                      <p className="text-xs text-base-content/50">
                        প্রতি {product.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ৳ {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-base-content/50">
              <div className="text-4xl mb-3">📊</div>
              <p>বাজারের দামের তথ্য পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
