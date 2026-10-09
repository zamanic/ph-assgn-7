export interface MarketPrice {
  bazar: string;
  price: number;
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
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}

export type SortOption = "default" | "price-asc" | "price-desc";
