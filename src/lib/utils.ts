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
  "https://api.api-store.workers.dev/api/bazardor";

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
// ========================================================================

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${API_BASE}/products?category=${encodeURIComponent(category)}`
    : `${API_BASE}/products`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const data = await res.json();
  return normalizeProducts(data);
}

export async function fetchProduct(
  id: string | number,
): Promise<Product | null> {
  const res = await fetch(
    `${API_BASE}/products/${encodeURIComponent(String(id))}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    // Fallback: look up by numeric id in the full list
    try {
      const all = await fetchProducts();
      const byId =
        all.find((p) => String(p.id) === String(id)) ||
        all.find((p) => p.slug === String(id));
      return byId || null;
    } catch {
      return null;
    }
  }
  const raw = await res.json();
  if (!raw) return null;
  return normalizeProduct(raw);
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  const data = await res.json();
  return normalizeCategories(data);
}

export async function fetchCategory(slug: string): Promise<Category | null> {
  const res = await fetch(
    `${API_BASE}/categories/${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) {
    try {
      const all = await fetchCategories();
      return all.find((c) => c.slug === slug || c.id === slug) || null;
    } catch {
      return null;
    }
  }
  const raw = await res.json();
  if (!raw) return null;
  return normalizeCategory(raw);
}
