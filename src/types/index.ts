export interface MarketPrice {
  bazar: string;
  price: number;
  // Extra: per-market min/max (shown in বাজারভিত্তিক দাম section)
  min?: number;
  max?: number;
  division?: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  category: string;
  categoryName: string;
  unit: string;
  summary: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  todayPrice: number;
  changePercent: number;
  prices: MarketPrice[];
  // Historical prices (from API: yesterday / lastWeek / lastMonth)
  yesterdayPrice?: number;
  lastWeekPrice?: number;
  lastMonthPrice?: number;
  // Extra: raw markets array (optional, preserves API structure)
  _rawMarkets?: unknown[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export type SortOption = "default" | "price-asc" | "price-desc";
