"use client";

import { useEffect, useState, use } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  fetchProduct,
  fetchProducts,
  formatPrice,
  formatPercent,
  toBangla,
} from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import type { Product } from "@/types";
import LoadingSkeleton from "./loading";

/** Format a market average: integer when whole, 2 decimals otherwise (Bengali digits) */
function formatMarketAvg(val: number): string {
  if (!isFinite(val)) return "—";
  if (Number.isInteger(val)) return toBangla(val);
  return toBangla(val.toFixed(2));
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: session, isPending: sessionPending } = useSession();
  const { products } = useApp();
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

        // 1. Grab the id of the selected item from the home page's products list
        //    (which came from /api/bazardor/products). If context isn't ready yet,
        //    fetch the full list to resolve slug -> id.
        let listProduct =
          products.find((p) => p.slug === slug) ||
          products.find((p) => String(p.id) === slug);

        if (!listProduct) {
          const all = await fetchProducts();
          listProduct =
            all.find((p) => p.slug === slug) ||
            all.find((p) => String(p.id) === slug);
        }

        const id = listProduct?.id ?? slug;

        // 2. Fetch the single product from /api/bazardor/products/{id}
        const found = await fetchProduct(id);
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
  }, [session, sessionPending, slug, router, products]);

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

  const changeDir =
    product.changePercent > 0
      ? "up"
      : product.changePercent < 0
        ? "down"
        : "flat";
  const changeWord =
    changeDir === "up"
      ? "বেড়েছে"
      : changeDir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত";
  const badgeClass =
    changeDir === "up" ? "is-up" : changeDir === "down" ? "is-down" : "is-flat";
  const badgeIcon = changeDir === "up" ? "▲" : changeDir === "down" ? "▼" : "—";

  // Min / Max across all markets (fallback to computed values)
  const marketPrices = product.prices || [];
  const allMins = marketPrices
    .map((m) => m.min ?? m.price)
    .filter((n) => n > 0);
  const allMaxs = marketPrices
    .map((m) => m.max ?? m.price)
    .filter((n) => n > 0);
  const minPrice = allMins.length ? Math.min(...allMins) : product.minPrice;
  const maxPrice = allMaxs.length ? Math.max(...allMaxs) : product.maxPrice;
  const avgPrice =
    allMins.length && allMaxs.length
      ? Math.round(
          [...allMins, ...allMaxs].reduce((s, v) => s + v, 0) /
            (allMins.length + allMaxs.length),
        )
      : product.avgPrice;

  const categoryHref = `/category/${product.category}`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb: হোম > মাছ > রুই মাছ */}
      <nav
        className="flex items-center gap-2 mb-6 text-sm"
        style={{ color: "#1D271F", opacity: 0.7 }}
        aria-label="ব্রেডক্রাম্ব"
      >
        <Link href="/" className="hover:text-[#05893E] transition-colors">
          হোম
        </Link>
        <span aria-hidden>›</span>
        <Link
          href={categoryHref}
          className="hover:text-[#05893E] transition-colors"
        >
          {product.categoryName}
        </Link>
        <span aria-hidden>›</span>
        <span style={{ color: "#1D271F", opacity: 1, fontWeight: 500 }}>
          {product.name}
        </span>
      </nav>

      {/* Product info card */}
      <div
        className="bg-[#FAFCFA] mb-6"
        style={{
          borderRadius: 16,
          border: "1px solid #E1E8E1",
          padding: 24,
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          {/* Emoji icon */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "#F0F5F0",
              fontSize: 44,
            }}
            aria-hidden
          >
            {product.emoji}
          </div>

          {/* Title + subtitle + description */}
          <div className="flex-1 min-w-0">
            <h1
              className="m-0 text-[#1D271F]"
              style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.3 }}
            >
              {product.name}
            </h1>
            <p
              className="m-0 mt-1"
              style={{ fontSize: 14, color: "#1D271F", opacity: 0.7 }}
            >
              প্রতি {product.unit} · {product.categoryName}
            </p>
            <p
              className="m-0 mt-3"
              style={{
                fontSize: 15,
                color: "#1D271F",
                opacity: 0.85,
                lineHeight: 1.6,
              }}
            >
              গতকালের তুলনায় আজ দাম{" "}
              <strong style={{ fontWeight: 700 }}>{changeWord}</strong>{" "}
              {formatPercent(product.changePercent)}%
            </p>
          </div>

          {/* Today's price block (right side) */}
          <div
            className="shrink-0 text-center"
            style={{
              background: "#F0F5F0",
              borderRadius: 16,
              padding: "16px 24px",
              minWidth: 140,
            }}
          >
            <p
              className="m-0"
              style={{ fontSize: 13, color: "#1D271F", opacity: 0.6 }}
            >
              আজকের দাম
            </p>
            <p
              className="m-0 mt-1 text-[#05893E]"
              style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.1 }}
            >
              {formatPrice(product.todayPrice)}
            </p>
            <p
              className="m-0"
              style={{ fontSize: 13, color: "#1D271F", opacity: 0.6 }}
            >
              টাকা / {product.unit}
            </p>
            <span
              className={`badge-penpot ${badgeClass}`}
              style={{ marginTop: 8, fontSize: 13, padding: "4px 10px" }}
            >
              <span aria-hidden>{badgeIcon}</span>
              <span>{formatPercent(product.changePercent)}%</span>
            </span>
          </div>
        </div>
      </div>

      {/* দামের সারসংক্ষেপ */}
      <div
        className="bg-[#FAFCFA] mb-6"
        style={{
          borderRadius: 16,
          border: "1px solid #E1E8E1",
          padding: 24,
        }}
      >
        <h2
          className="m-0 mb-5 text-[#1D271F]"
          style={{ fontSize: 20, fontWeight: 700 }}
        >
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* সর্বনিম্ন দাম */}
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #E1E8E1",
              padding: 20,
              background: "#FFFFFF",
            }}
          >
            <p
              className="m-0"
              style={{ fontSize: 13, color: "#1D271F", opacity: 0.6 }}
            >
              সর্বনিম্ন দাম
            </p>
            <p
              className="m-0 mt-2"
              style={{ fontSize: 24, fontWeight: 700, color: "#1A9951" }}
            >
              {formatPrice(minPrice)} টাকা
            </p>
            <p
              className="m-0 mt-1"
              style={{ fontSize: 12, color: "#1D271F", opacity: 0.55 }}
            >
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          {/* সর্বাধিক দাম */}
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #E1E8E1",
              padding: 20,
              background: "#FFFFFF",
            }}
          >
            <p
              className="m-0"
              style={{ fontSize: 13, color: "#1D271F", opacity: 0.6 }}
            >
              সর্বাধিক দাম
            </p>
            <p
              className="m-0 mt-2"
              style={{ fontSize: 24, fontWeight: 700, color: "#D03739" }}
            >
              {formatPrice(maxPrice)} টাকা
            </p>
            <p
              className="m-0 mt-1"
              style={{ fontSize: 12, color: "#1D271F", opacity: 0.55 }}
            >
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* গড় দাম */}
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #E1E8E1",
              padding: 20,
              background: "#FFFFFF",
            }}
          >
            <p
              className="m-0"
              style={{ fontSize: 13, color: "#1D271F", opacity: 0.6 }}
            >
              গড় দাম
            </p>
            <p
              className="m-0 mt-2"
              style={{ fontSize: 24, fontWeight: 700, color: "#05893E" }}
            >
              {formatPrice(avgPrice)} টাকা
            </p>
            <p
              className="m-0 mt-1"
              style={{ fontSize: 12, color: "#1D271F", opacity: 0.55 }}
            >
              প্রতি {product.unit}-এর হিসাবে
            </p>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম */}
      <div
        className="bg-[#FAFCFA] mb-6"
        style={{
          borderRadius: 16,
          border: "1px solid #E1E8E1",
          padding: 24,
        }}
      >
        <h2
          className="m-0 mb-5 text-[#1D271F]"
          style={{ fontSize: 20, fontWeight: 700 }}
        >
          বাজারভিত্তিক আজকের দাম
        </h2>

        {marketPrices.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table
              className="w-full"
              style={{
                borderCollapse: "separate",
                borderSpacing: 0,
                fontSize: 14,
              }}
            >
              <thead>
                <tr>
                  {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বাধিক", "গড়"].map(
                    (th) => (
                      <th
                        key={th}
                        className="text-left"
                        style={{
                          padding: "12px 16px",
                          fontWeight: 600,
                          color: "#1D271F",
                          opacity: 0.7,
                          borderBottom: "1px solid #E1E8E1",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {th}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {marketPrices.map((m, idx) => {
                  const mn = m.min ?? m.price;
                  const mx = m.max ?? m.price;
                  const avg = (mn + mx) / 2;
                  return (
                    <tr
                      key={idx}
                      style={{
                        background: idx % 2 === 1 ? "#F5F9F5" : "#FFFFFF",
                      }}
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          fontWeight: 600,
                          color: "#1D271F",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.bazar}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#1D271F",
                          opacity: 0.7,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.division || "—"}
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#1D271F",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatPrice(mn)} টাকা
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          color: "#1D271F",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatPrice(mx)} টাকা
                      </td>
                      <td
                        style={{
                          padding: "14px 16px",
                          fontWeight: 600,
                          color: "#1D271F",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatMarketAvg(avg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-[#1D271F]/50">
            <div className="text-4xl mb-3">📊</div>
            <p>বাজারের দামের তথ্য পাওয়া যায়নি</p>
          </div>
        )}
      </div>

      {/* Category link section */}
      <Link
        href={categoryHref}
        className="block bg-[#FAFCFA] no-underline"
        style={{
          borderRadius: 16,
          border: "1px solid #E1E8E1",
          padding: 24,
          transition: "border-color 150ms ease, box-shadow 150ms ease",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#F0F5F0",
              fontSize: 28,
            }}
            aria-hidden
          >
            {product.emoji}
          </div>
          <div>
            <h3
              className="m-0 text-[#1D271F]"
              style={{ fontSize: 22, fontWeight: 700 }}
            >
              {product.categoryName}
            </h3>
            <p
              className="m-0 mt-1"
              style={{ fontSize: 14, color: "#1D271F", opacity: 0.7 }}
            >
              এই ক্যাটাগরির সব পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
