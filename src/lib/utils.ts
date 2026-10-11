import type { Product, Category, MarketPrice } from "@/types";

const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// Unit code -> Bangla translation (API sends "kg"/"ltr"/"pcs"/"dozen", UI shows "কেজি"/"লিটার"/"পিস"/"ডজন")
const UNIT_MAP: Record<string, string> = {
  kg: "কেজি",
  "kg.": "কেজি",
  ltr: "লিটার",
  litre: "লিটার",
  liter: "লিটার",
  "ltr.": "লিটার",
  pcs: "পিস",
  pc: "পিস",
  piece: "পিস",
  dozen: "ডজন",
  dz: "ডজন",
  ডজন: "ডজন",
  কেজি: "কেজি",
  লিটার: "লিটার",
  পিস: "পিস",
};

function toBanglaUnit(unit: string): string {
  if (!unit) return "কেজি";
  const u = String(unit).trim().toLowerCase();
  if (UNIT_MAP[u]) return UNIT_MAP[u];
  return unit; // fallback: show raw if unknown
}

export function toBangla(num: number | string | null | undefined): string {
  if (num === undefined || num === null) return "—";
  const str = typeof num === "number" ? num.toString() : String(num);
  return str.replace(/\d/g, (d) => banglaDigits[parseInt(d)] ?? d);
}

export function formatPrice(price: number | null | undefined): string {
  if (price === undefined || price === null || Number.isNaN(Number(price)))
    return "—";
  const n = Number(price);
  const formatted = n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return toBangla(formatted);
}

export function formatPercent(percent: number | null | undefined): string {
  if (
    percent === undefined ||
    percent === null ||
    Number.isNaN(Number(percent))
  )
    return "০.০";
  const n = Number(percent);
  const abs = Math.abs(n).toFixed(1);
  return toBangla(abs);
}

export function getBanglaDate(): string {
  const now = new Date();
  const days = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];
  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const dayName = days[now.getDay()];
  const day = toBangla(now.getDate());
  const month = months[now.getMonth()];
  const year = toBangla(now.getFullYear());
  return `${dayName}, ${day} ${month} ${year}`;
}

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://openapi.programming-hero.com/api/bazardor";

// ========================================================================
// Data Normalizers — map raw API response fields to our Product/Category TS types
// ========================================================================

type RawMarket = {
  market?: string;
  division?: string;
  min?: number;
  max?: number;
  price?: number;
};
type RawProduct = {
  id?: number | string;
  slug?: string;
  nameBn?: string;
  name?: string;
  category?: string;
  categoryNameBn?: string;
  categoryName?: string;
  categoryIcon?: string;
  icon?: string;
  unit?: string;
  image?: string;
  emoji?: string;
  today?: number;
  todayPrice?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: { dir?: string; pct?: number } | null;
  changePercent?: number;
  markets?: RawMarket[];
  prices?: MarketPrice[];
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  summary?: string;
};
type RawCategory = {
  id?: string | number;
  slug?: string;
  nameBn?: string;
  name?: string;
  icon?: string;
};

function avgMinMax(markets: RawMarket[]): {
  min: number;
  max: number;
  avg: number;
} {
  if (!markets || markets.length === 0) return { min: 0, max: 0, avg: 0 };
  const mins = markets
    .map((m) => Number(m.min ?? m.price ?? 0))
    .filter((n) => n > 0);
  const maxs = markets
    .map((m) => Number(m.max ?? m.price ?? 0))
    .filter((n) => n > 0);
  const allVals = [...mins, ...maxs];
  if (allVals.length === 0) return { min: 0, max: 0, avg: 0 };
  const min = Math.min(...allVals);
  const max = Math.max(...allVals);
  const avg = Math.round(allVals.reduce((s, v) => s + v, 0) / allVals.length);
  return { min, max, avg };
}

function buildSummary(p: RawProduct, unit: string): string {
  if (p.summary) return p.summary;
  const marketCount = (p.markets || p.prices || []).length;
  const dir =
    (p.change && p.change.dir) ||
    (p.changePercent && p.changePercent > 0
      ? "up"
      : p.changePercent && p.changePercent < 0
        ? "down"
        : "flat");
  const direction =
    dir === "up" ? "বেড়েছে" : dir === "down" ? "কমেছে" : "অপরিবর্তিত";
  return `সম্প্রতি বাজারে ${p.nameBn || p.name || "এই পণ্যের"} দাম ${direction}। ${marketCount} টি বাজার ভিত্তিক গড় দাম প্রতি ${unit}।`;
}

export function normalizeProduct(raw: RawProduct): Product {
  const id = Number(raw.id) || 0;
  const slug = raw.slug || `product-${id}`;
  const name = raw.nameBn || raw.name || "অজানা পণ্য";
  const emoji = raw.emoji || raw.image || raw.categoryIcon || "📦";
  const category = raw.category || "general";
  const categoryName = raw.categoryNameBn || raw.categoryName || category;
  const unit = toBanglaUnit(raw.unit || "কেজি");
  const changePercent = Number(
    raw.changePercent ?? (raw.change && raw.change.pct) ?? 0,
  );
  const todayPrice = Number(raw.todayPrice ?? raw.today ?? 0);
  const { min, max, avg } = avgMinMax(raw.markets || []);
  // If markets didn't give numbers, fall back to explicit keys or todayPrice
  const minPrice = Number(raw.minPrice ?? (min > 0 ? min : todayPrice));
  const maxPrice = Number(raw.maxPrice ?? (max > 0 ? max : todayPrice));
  const avgPrice = Number(raw.avgPrice ?? (avg > 0 ? avg : todayPrice));

  // Build prices[] array from markets[] (both market name + avg price shown)
  const prices: MarketPrice[] = raw.markets
    ? (raw.markets
        .map((m) => {
          const price =
            Number((Number(m.min) + Number(m.max || m.min || 0)) / 2) ||
            Number(m.price) ||
            0;
          return {
            bazar: m.market || m.division || "অজানা বাজার",
            price,
            min: Number(m.min),
            max: Number(m.max),
            division: m.division,
          } as MarketPrice & { min?: number; max?: number; division?: string };
        })
        .filter((p) => p && p.price && p.bazar) as MarketPrice[])
    : raw.prices || [];

  return {
    id,
    slug,
    name,
    emoji,
    category,
    categoryName,
    unit,
    summary: buildSummary(raw, unit),
    minPrice,
    maxPrice,
    avgPrice: avgPrice || todayPrice,
    todayPrice: todayPrice || avgPrice || 0,
    changePercent,
    prices,
    // Historical prices (for detail page)
    yesterdayPrice: raw.yesterday ? Number(raw.yesterday) : undefined,
    lastWeekPrice: raw.lastWeek ? Number(raw.lastWeek) : undefined,
    lastMonthPrice: raw.lastMonth ? Number(raw.lastMonth) : undefined,
    // Keep raw markets for easy use in per-market display
    // @ts-ignore: markets is extra (not strictly in interface but helpful)
    _rawMarkets: raw.markets,
  } as Product;
}

export function normalizeProducts(data: any[]): Product[] {
  if (!Array.isArray(data)) return [];
  return data.map(normalizeProduct).filter((p) => p && p.id);
}

export function normalizeCategory(raw: RawCategory): Category {
  const id = String(raw.id ?? raw.slug ?? "");
  return {
    id,
    slug: raw.slug || id,
    name: raw.nameBn || raw.name || id,
    icon: raw.icon || "📁",
  };
}

export function normalizeCategories(data: any[]): Category[] {
  if (!Array.isArray(data)) return [];
  return data.map(normalizeCategory).filter((c) => c.id);
}

// ========================================================================
// Fetch wrappers — return TYPED & normalized arrays / objects
//
// FALLBACK POLICY (implemented because api.api-store.workers.dev returns
// HTTP 429 Too Many Requests when hit from this IP — this caused constant
// toast errors "ক্যাটাগরি ডেটা লোড করতে সমস্যা হয়েছে" every page load).
//
//   1. Try primary URL once.
//   2. On 429 / 5xx / network error → wait 200 ms → retry 1×.
//   3. Still failing → resolve SILENTLY with getSeed*() data from src/data/seed.ts.
//   4. NEVER throw to the UI layer (no more spurious toasts).
//   5. Return `{ data, fromFallback }` via `...WithMeta` helpers so the UI can
//      optionally show ONE informational toast (debounced per browser session).
// ========================================================================

import {
  getSeedCategories,
  getSeedCategoryBySlug,
  getSeedProductById,
  getSeedProducts,
} from "@/data/seed";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Attempts fetch; returns either parsed JSON data T or null if unrecoverable */
async function tryFetchOnce<T = any>(
  url: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) {
      // 429 / 5xx — treat as retryable by returning null (caller retries)
      if (res.status === 429 || res.status >= 500) return null;
      // 4xx (404/400) — non recoverable API logic error, fallback
      return null;
    }
    const text = await res.text();
    if (!text) return null;
    try {
      return JSON.parse(text) as T;
    } catch {
      return null;
    }
  } catch {
    // Network failure (DNS/timeout/abort)
    return null;
  }
}

async function fetchWithFallback<T = any>(url: string): Promise<T | null> {
  const options: RequestInit = { cache: "no-store" };
  const first = await tryFetchOnce<T>(url, options);
  if (first !== null) return first;
  await sleep(200);
  const second = await tryFetchOnce<T>(url, options);
  if (second !== null) return second;
  return null;
}

export interface FetchMeta {
  fromFallback: boolean;
}

export async function fetchProductsWithMeta(category?: string): Promise<
  {
    data: Product[];
  } & FetchMeta
> {
  const url = category
    ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
    : `${API_BASE}/products`;
  const raw = await fetchWithFallback<any[]>(url);
  if (Array.isArray(raw) && raw.length > 0) {
    const normalized = normalizeProducts(raw);
    if (normalized.length > 0) return { data: normalized, fromFallback: false };
  }
  return { data: getSeedProducts(category), fromFallback: true };
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  const { data } = await fetchProductsWithMeta(category);
  return data;
}

export async function fetchProductWithMeta(
  id: string | number,
): Promise<{ data: Product | null } & FetchMeta> {
  const url = `${API_BASE}/products/${encodeURIComponent(String(id))}`;
  const raw = await fetchWithFallback<any>(url);
  if (raw) {
    const p = normalizeProduct(raw);
    if (p && p.id) return { data: p, fromFallback: false };
  }
  // Fallback #1: full-list lookup
  const list = await fetchProductsWithMeta();
  if (list.data.length > 0) {
    const found =
      list.data.find((p) => String(p.id) === String(id)) ||
      list.data.find((p) => p.slug === String(id));
    if (found) return { data: found, fromFallback: list.fromFallback };
  }
  // Fallback #2: static seed by id/slug
  return { data: getSeedProductById(id), fromFallback: true };
}

export async function fetchProduct(
  id: string | number,
): Promise<Product | null> {
  const { data } = await fetchProductWithMeta(id);
  return data;
}

export async function fetchCategoriesWithMeta(): Promise<
  {
    data: Category[];
  } & FetchMeta
> {
  const raw = await fetchWithFallback<any[]>(`${API_BASE}/categories`);
  if (Array.isArray(raw) && raw.length > 0) {
    const normalized = normalizeCategories(raw);
    if (normalized.length > 0) return { data: normalized, fromFallback: false };
  }
  return { data: getSeedCategories(), fromFallback: true };
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await fetchCategoriesWithMeta();
  return data;
}

export async function fetchCategoryWithMeta(slug: string): Promise<
  {
    data: Category | null;
  } & FetchMeta
> {
  const url = `${API_BASE}/categories/${encodeURIComponent(slug)}`;
  const raw = await fetchWithFallback<any>(url);
  if (raw) {
    const c = normalizeCategory(raw);
    if (c && c.id) return { data: c, fromFallback: false };
  }
  const list = await fetchCategoriesWithMeta();
  if (list.data.length > 0) {
    const found = list.data.find((c) => c.slug === slug || c.id === slug);
    if (found) return { data: found, fromFallback: list.fromFallback };
  }
  return { data: getSeedCategoryBySlug(slug), fromFallback: true };
}

export async function fetchCategory(slug: string): Promise<Category | null> {
  const { data } = await fetchCategoryWithMeta(slug);
  return data;
}
