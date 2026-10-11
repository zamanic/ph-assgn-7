"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { fetchProducts, formatPrice, formatPercent } from "@/lib/utils";
import type { Product } from "@/types";
import LoadingSkeleton from "./loading";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: session, isPending: sessionPending } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    if (sessionPending) return;
    if (!session) {
      const callbackUrl = encodeURIComponent(`/product/${slug}`);
      toast.error("এই পেজ দেখতে লগইন করুন");
      router.replace(`/signin?callbackUrl=${callbackUrl}`);
      return;
    }

    const fetchProductData = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        const found =
          products.find((p) => p.slug === slug) ||
          products.find((p) => String(p.id) === slug);
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
  }, [session, sessionPending, slug, router]);

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
        <Link href="/" className="btn btn-primary btn-lg mt-6">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const up = product.changePercent > 0;
  const down = product.changePercent < 0;
  const badgeClass = up ? "is-up" : down ? "is-down" : "is-flat";
  const badgeIcon = up ? "▲" : down ? "▼" : "—";
  const badgeSign = up ? "+" : down ? "-" : "";

  const history = [
    { label: "গতকাল", value: product.yesterdayPrice, compare: product.todayPrice },
    { label: "গত সপ্তাহে", value: product.lastWeekPrice, compare: product.todayPrice },
    { label: "গত মাসে", value: product.lastMonthPrice, compare: product.todayPrice },
  ].filter((h) => typeof h.value === "number" && h.value > 0);

  const stats = [
    { label: "সর্বনিম্ন দাম", value: product.minPrice, color: "#1A9951" },
    { label: "সর্বোচ্চ দাম", value: product.maxPrice, color: "#D03739" },
    { label: "গড় দাম", value: product.avgPrice, color: "#1D271F" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#1D271F]/60 hover:text-primary transition-colors"
        >
          <span>←</span>
          হোম পেজে ফিরে যান
        </Link>
      </div>

      {/* Header card: icon + name + summary + badges */}
      <div className="card bg-base-100 shadow-lg mb-6 overflow-hidden">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div
              className="h-20 w-20 flex items-center justify-center text-5xl rounded-2xl shrink-0"
              style={{ background: "#F0F5F0" }}
            >
              {product.emoji}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="badge badge-sm px-3 py-1"
                  style={{ background: "#1A99511A", color: "#1A9951" }}
                >
                  {product.categoryName}
                </span>
                <span
                  className="badge badge-outline badge-sm px-3 py-1"
                  style={{ color: "#1D271F" }}
                >
                  প্রতি {product.unit}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#1D271F]">
                {product.name}
              </h1>
              <p className="text-[#1D271F]/70 leading-relaxed">
                {product.summary}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's price highlight */}
      <div className="card bg-base-100 shadow-lg mb-6 overflow-hidden">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p
                className="m-0 mb-1"
                style={{ fontSize: 13, color: "#1D271F", opacity: 0.55 }}
              >
                আজকের দাম
              </p>
              <p
                className="m-0"
                style={{ fontSize: 40, fontWeight: 700, color: "#05893E", lineHeight: 1.1 }}
              >
                {formatPrice(product.todayPrice)}
                <span
                  className="ml-1"
                  style={{ fontSize: 16, fontWeight: 400, color: "#1D271F", opacity: 0.6 }}
                >
                  টাকা
                </span>
              </p>
            </div>
            <span className={`badge-penpot ${badgeClass}`} style={{ fontSize: 14, padding: "6px 12px" }}>
              <span aria-hidden>{badgeIcon}</span>
              <span>
                {badgeSign}
                {formatPercent(product.changePercent)}%
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Historical prices */}
      {history.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {history.map((h) => {
            const diff = (h.compare as number) - (h.value as number);
            const hUp = diff > 0;
            const hDown = diff < 0;
            const hIcon = hUp ? "▲" : hDown ? "▼" : "—";
            const hColor = hUp ? "#D03739" : hDown ? "#1A9951" : "#1D271F";
            return (
              <div key={h.label} className="card bg-base-100 shadow-sm">
                <div className="card-body p-4">
                  <p className="text-xs text-[#1D271F]/60 mb-1">{h.label}</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-xl font-bold text-[#1D271F]">
                      ৳ {formatPrice(h.value)}
                    </p>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: hColor }}
                    >
                      {hIcon} {formatPrice(Math.abs(diff))}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Min / Max / Avg stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <p className="text-xs text-[#1D271F]/60 mb-1">{s.label}</p>
              <p className="text-xl font-bold" style={{ color: s.color }}>
                ৳ {formatPrice(s.value)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Market-wise price list */}
      <div className="card bg-base-100 shadow-lg overflow-hidden">
        <div className="card-body p-6">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-[#1D271F]">
            <span>🏪</span>
            বাজারভিত্তিক আজকের দাম
          </h2>

          {product.prices && product.prices.length > 0 ? (
            <div className="divide-y divide-[#E1E8E1]">
              {product.prices.map((item, idx) => {
                const hasRange =
                  typeof item.min === "number" &&
                  typeof item.max === "number" &&
                  item.min !== item.max;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-4 px-2 hover:bg-[#F0F5F0] rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-lg"
                        style={{ background: "#1A99511A" }}
                      >
                        🛒
                      </div>
                      <div>
                        <p className="font-semibold text-[#1D271F]">
                          {item.bazar}
                        </p>
                        <p className="text-xs text-[#1D271F]/50">
                          {item.division ? `${item.division} · ` : ""}
                          প্রতি {product.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {hasRange ? (
                        <>
                          <p className="text-lg font-bold text-[#05893E]">
                            ৳ {formatPrice(item.min!)} —{" "}
                            {formatPrice(item.max!)}
                          </p>
                          <p className="text-xs text-[#1D271F]/50">
                            গড়: ৳ {formatPrice(item.price)}
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-bold text-[#05893E]">
                          ৳ {formatPrice(item.price)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-[#1D271F]/50">
              <div className="text-4xl mb-3">📊</div>
              <p>বাজারের দামের তথ্য পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
