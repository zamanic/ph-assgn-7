/* ========================================================================
   Seed / FALLBACK DATASET
   ========================================================================
   8 categories (matches openapi.programming-hero.com/api/bazardor/categories)
   + 33 realistic Bengali-market products.
   Used as OFFLINE FALLBACK when the upstream API returns 429 Too Many Requests,
   5xx, or network errors. Always returned SILENTLY (no UI toasts).

   Prices use a 5-minute windowed jitter so numbers drift naturally but stay
   stable across StrictMode double-render (no randomness-per-render FOUC).
   ========================================================================= */

import type { Category, Product } from "@/types";

/* ── 8 Categories (exact match to openapi.programming-hero.com) ────────── */
export const SEED_CATEGORIES: Category[] = [
  { id: "chal", slug: "chal", name: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", name: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", name: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", name: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", name: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", name: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", name: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", name: "মসলা", icon: "🌶️" },
];

/* ── 33 Products ──────────────────────────────────────────────────────────── */
type RawSeed = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  category: string;
  categoryName: string;
  unit: string;
  basePrice: number;
  min: number;
  max: number;
  avg: number;
  changePercent: number;
  markets: {
    bazar: string;
    price: number;
    min: number;
    max: number;
    division?: string;
  }[];
};

const RAW: RawSeed[] = [
  // চাল (4)
  {
    id: 1,
    slug: "miniket-chal",
    name: "মিনিকেট চাল",
    emoji: "🌾",
    category: "chal",
    categoryName: "চাল",
    unit: "কেজি",
    basePrice: 82,
    min: 80,
    max: 85,
    avg: 82,
    changePercent: 1.23,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 85,
        min: 83,
        max: 87,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 82,
        min: 80,
        max: 84,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 80,
        min: 78,
        max: 82,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 2,
    slug: "nazirsail-chal",
    name: "নাজিরশাইল চাল",
    emoji: "🌾",
    category: "chal",
    categoryName: "চাল",
    unit: "কেজি",
    basePrice: 95,
    min: 92,
    max: 98,
    avg: 95,
    changePercent: -0.52,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 98,
        min: 96,
        max: 100,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 95,
        min: 93,
        max: 97,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 92,
        min: 90,
        max: 94,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 3,
    slug: "birasail-chal",
    name: "ব্রিজচাল চাল",
    emoji: "🌾",
    category: "chal",
    categoryName: "চাল",
    unit: "কেজি",
    basePrice: 72,
    min: 70,
    max: 75,
    avg: 72,
    changePercent: 0.7,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 75,
        min: 73,
        max: 77,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 72,
        min: 70,
        max: 74,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 70,
        min: 68,
        max: 72,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 4,
    slug: "polao-chal",
    name: "পোলাও চাল",
    emoji: "🌾",
    category: "chal",
    categoryName: "চাল",
    unit: "কেজি",
    basePrice: 118,
    min: 115,
    max: 122,
    avg: 118,
    changePercent: 2.17,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 122,
        min: 120,
        max: 124,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 118,
        min: 116,
        max: 120,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 115,
        min: 113,
        max: 117,
        division: "ঢাকা",
      },
    ],
  },

  // ডাল (5)
  {
    id: 5,
    slug: "moshur-dal",
    name: "মসুর ডাল",
    emoji: "🫘",
    category: "dal",
    categoryName: "ডাল",
    unit: "কেজি",
    basePrice: 135,
    min: 132,
    max: 138,
    avg: 135,
    changePercent: -1.46,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 138,
        min: 136,
        max: 140,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 135,
        min: 133,
        max: 137,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 132,
        min: 130,
        max: 134,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 6,
    slug: "chhola-dal",
    name: "ছোলার ডাল",
    emoji: "🫘",
    category: "dal",
    categoryName: "ডাল",
    unit: "কেজি",
    basePrice: 110,
    min: 108,
    max: 113,
    avg: 110,
    changePercent: 0.91,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 113,
        min: 111,
        max: 115,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 110,
        min: 108,
        max: 112,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 108,
        min: 106,
        max: 110,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 7,
    slug: "boot-dal",
    name: "বুট ডাল",
    emoji: "🫘",
    category: "dal",
    categoryName: "ডাল",
    unit: "কেজি",
    basePrice: 125,
    min: 122,
    max: 128,
    avg: 125,
    changePercent: 0.0,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 128,
        min: 126,
        max: 130,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 125,
        min: 123,
        max: 127,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 122,
        min: 120,
        max: 124,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 8,
    slug: "mug-dal",
    name: "মুগ ডাল",
    emoji: "🫘",
    category: "dal",
    categoryName: "ডাল",
    unit: "কেজি",
    basePrice: 155,
    min: 152,
    max: 158,
    avg: 155,
    changePercent: 1.97,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 158,
        min: 156,
        max: 160,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 155,
        min: 153,
        max: 157,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 152,
        min: 150,
        max: 154,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 9,
    slug: "chhola-boot",
    name: "ছোলা-বুট",
    emoji: "🫘",
    category: "dal",
    categoryName: "ডাল",
    unit: "কেজি",
    basePrice: 120,
    min: 118,
    max: 123,
    avg: 120,
    changePercent: -0.83,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 123,
        min: 121,
        max: 125,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 120,
        min: 118,
        max: 122,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 118,
        min: 116,
        max: 120,
        division: "ঢাকা",
      },
    ],
  },

  // তেল (3)
  {
    id: 10,
    slug: "soyabean-tel",
    name: "সয়াবিন তেল",
    emoji: "🛢️",
    category: "tel",
    categoryName: "তেল",
    unit: "লিটার",
    basePrice: 178,
    min: 175,
    max: 181,
    avg: 178,
    changePercent: -2.2,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 181,
        min: 179,
        max: 183,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 178,
        min: 176,
        max: 180,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 175,
        min: 173,
        max: 177,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 11,
    slug: "mustard-tel",
    name: "সরিষার তেল",
    emoji: "🛢️",
    category: "tel",
    categoryName: "তেল",
    unit: "লিটার",
    basePrice: 230,
    min: 226,
    max: 234,
    avg: 230,
    changePercent: 1.32,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 234,
        min: 232,
        max: 236,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 230,
        min: 228,
        max: 232,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 226,
        min: 224,
        max: 228,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 12,
    slug: "sunflower-tel",
    name: "সানফ্লাওয়ার তেল",
    emoji: "🛢️",
    category: "tel",
    categoryName: "তেল",
    unit: "লিটার",
    basePrice: 195,
    min: 192,
    max: 198,
    avg: 195,
    changePercent: 0.51,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 198,
        min: 196,
        max: 200,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 195,
        min: 193,
        max: 197,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 192,
        min: 190,
        max: 194,
        division: "ঢাকা",
      },
    ],
  },

  // মশলা (4)
  {
    id: 13,
    slug: "morich",
    name: "কাঁচা মরিচ",
    emoji: "🌶️",
    category: "mosla",
    categoryName: "মশলা",
    unit: "কেজি",
    basePrice: 260,
    min: 255,
    max: 265,
    avg: 260,
    changePercent: -3.7,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 265,
        min: 263,
        max: 267,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 260,
        min: 258,
        max: 262,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 255,
        min: 253,
        max: 257,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 14,
    slug: "ada",
    name: "আদা",
    emoji: "🌶️",
    category: "mosla",
    categoryName: "মশলা",
    unit: "কেজি",
    basePrice: 220,
    min: 215,
    max: 225,
    avg: 220,
    changePercent: 0.0,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 225,
        min: 223,
        max: 227,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 220,
        min: 218,
        max: 222,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 215,
        min: 213,
        max: 217,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 15,
    slug: "rosun",
    name: "রসুন",
    emoji: "🌶️",
    category: "mosla",
    categoryName: "মশলা",
    unit: "কেজি",
    basePrice: 320,
    min: 310,
    max: 330,
    avg: 320,
    changePercent: 3.23,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 330,
        min: 328,
        max: 332,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 320,
        min: 318,
        max: 322,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 310,
        min: 308,
        max: 312,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 16,
    slug: "holud",
    name: "হলুদ",
    emoji: "🌶️",
    category: "mosla",
    categoryName: "মশলা",
    unit: "কেজি",
    basePrice: 410,
    min: 405,
    max: 420,
    avg: 410,
    changePercent: -1.2,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 420,
        min: 418,
        max: 422,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 410,
        min: 408,
        max: 412,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 405,
        min: 403,
        max: 407,
        division: "ঢাকা",
      },
    ],
  },

  // সবজি (6)
  {
    id: 17,
    slug: "alu",
    name: "আলু",
    emoji: "🥬",
    category: "sobji",
    categoryName: "সবজি",
    unit: "কেজি",
    basePrice: 35,
    min: 32,
    max: 38,
    avg: 35,
    changePercent: 5.71,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 38,
        min: 36,
        max: 40,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 35,
        min: 33,
        max: 37,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 32,
        min: 30,
        max: 34,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 18,
    slug: " begun",
    name: "বেগুন",
    emoji: "🥬",
    category: "sobji",
    categoryName: "সবজি",
    unit: "কেজি",
    basePrice: 48,
    min: 45,
    max: 50,
    avg: 48,
    changePercent: -4.17,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 50,
        min: 48,
        max: 52,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 48,
        min: 46,
        max: 50,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 45,
        min: 43,
        max: 47,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 19,
    slug: "tomato",
    name: "টমেটো",
    emoji: "🥬",
    category: "sobji",
    categoryName: "সবজি",
    unit: "কেজি",
    basePrice: 60,
    min: 55,
    max: 65,
    avg: 60,
    changePercent: -8.33,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 65,
        min: 63,
        max: 67,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 60,
        min: 58,
        max: 62,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 55,
        min: 53,
        max: 57,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 20,
    slug: "piaz",
    name: "পেঁয়াজ",
    emoji: "🥬",
    category: "sobji",
    categoryName: "সবজি",
    unit: "কেজি",
    basePrice: 85,
    min: 82,
    max: 88,
    avg: 85,
    changePercent: 2.38,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 88,
        min: 86,
        max: 90,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 85,
        min: 83,
        max: 87,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 82,
        min: 80,
        max: 84,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 21,
    slug: "kacha-morich",
    name: "কাঁচা মরিচ",
    emoji: "🥬",
    category: "sobji",
    categoryName: "সবজি",
    unit: "কেজি",
    basePrice: 115,
    min: 110,
    max: 120,
    avg: 115,
    changePercent: 0.87,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 120,
        min: 118,
        max: 122,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 115,
        min: 113,
        max: 117,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 110,
        min: 108,
        max: 112,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 22,
    slug: "fulkopi",
    name: "ফুলকপি",
    emoji: "🥬",
    category: "sobji",
    categoryName: "সবজি",
    unit: "কেজি",
    basePrice: 42,
    min: 40,
    max: 45,
    avg: 42,
    changePercent: -4.55,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 45,
        min: 43,
        max: 47,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 42,
        min: 40,
        max: 44,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 40,
        min: 38,
        max: 42,
        division: "ঢাকা",
      },
    ],
  },

  // ফল (4)
  {
    id: 23,
    slug: "aam",
    name: "আম",
    emoji: "🍎",
    category: "mach",
    categoryName: "মাছ",
    unit: "কেজি",
    basePrice: 180,
    min: 170,
    max: 190,
    avg: 180,
    changePercent: -6.25,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 190,
        min: 188,
        max: 192,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 180,
        min: 178,
        max: 182,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 170,
        min: 168,
        max: 172,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 24,
    slug: "apple",
    name: "আপেল",
    emoji: "🍎",
    category: "mach",
    categoryName: "মাছ",
    unit: "কেজি",
    basePrice: 220,
    min: 215,
    max: 228,
    avg: 220,
    changePercent: 0.45,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 228,
        min: 226,
        max: 230,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 220,
        min: 218,
        max: 222,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 215,
        min: 213,
        max: 217,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 25,
    slug: "kathal",
    name: "কাঁঠাল",
    emoji: "🍎",
    category: "mach",
    categoryName: "মাছ",
    unit: "কেজি",
    basePrice: 80,
    min: 70,
    max: 90,
    avg: 80,
    changePercent: 2.56,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 90,
        min: 88,
        max: 92,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 80,
        min: 78,
        max: 82,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 70,
        min: 68,
        max: 72,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 26,
    slug: "kola",
    name: "কলা",
    emoji: "🍎",
    category: "mach",
    categoryName: "মাছ",
    unit: "ডজন",
    basePrice: 60,
    min: 55,
    max: 65,
    avg: 60,
    changePercent: 0.0,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 65,
        min: 63,
        max: 67,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 60,
        min: 58,
        max: 62,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 55,
        min: 53,
        max: 57,
        division: "ঢাকা",
      },
    ],
  },

  // মাংস (3)
  {
    id: 27,
    slug: "murgi-mangsho",
    name: "মুরগির মাংস",
    emoji: "🍖",
    category: "mangsho",
    categoryName: "মাংস",
    unit: "কেজি",
    basePrice: 350,
    min: 340,
    max: 360,
    avg: 350,
    changePercent: 1.45,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 360,
        min: 358,
        max: 362,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 350,
        min: 348,
        max: 352,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 340,
        min: 338,
        max: 342,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 28,
    slug: "gorur-mangsho",
    name: "গরুর মাংস",
    emoji: "🍖",
    category: "mangsho",
    categoryName: "মাংস",
    unit: "কেজি",
    basePrice: 780,
    min: 760,
    max: 795,
    avg: 780,
    changePercent: 0.0,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 795,
        min: 793,
        max: 797,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 780,
        min: 778,
        max: 782,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 760,
        min: 758,
        max: 762,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 29,
    slug: "chashir-mangsho",
    name: "ছাগলের মাংস",
    emoji: "🍖",
    category: "mangsho",
    categoryName: "মাংস",
    unit: "কেজি",
    basePrice: 850,
    min: 830,
    max: 870,
    avg: 850,
    changePercent: 1.19,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 870,
        min: 868,
        max: 872,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 850,
        min: 848,
        max: 852,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 830,
        min: 828,
        max: 832,
        division: "ঢাকা",
      },
    ],
  },

  // দুগ্ধজাত (4)
  {
    id: 30,
    slug: "dudh",
    name: "গরুর দুধ",
    emoji: "🥛",
    category: "dim-dui",
    categoryName: "ডিম-দুধ",
    unit: "লিটার",
    basePrice: 110,
    min: 100,
    max: 120,
    avg: 110,
    changePercent: 4.76,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 120,
        min: 118,
        max: 122,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 110,
        min: 108,
        max: 112,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 100,
        min: 98,
        max: 102,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 31,
    slug: "ghee",
    name: "ঘি",
    emoji: "🥛",
    category: "dim-dui",
    categoryName: "ডিম-দুধ",
    unit: "কেজি",
    basePrice: 1200,
    min: 1150,
    max: 1250,
    avg: 1200,
    changePercent: 0.84,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 1250,
        min: 1245,
        max: 1255,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 1200,
        min: 1195,
        max: 1205,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 1150,
        min: 1145,
        max: 1155,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 32,
    slug: "doi",
    name: "দই",
    emoji: "🥛",
    category: "dim-dui",
    categoryName: "ডিম-দুধ",
    unit: "কেজি",
    basePrice: 220,
    min: 210,
    max: 230,
    avg: 220,
    changePercent: 2.33,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 230,
        min: 228,
        max: 232,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 220,
        min: 218,
        max: 222,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 210,
        min: 208,
        max: 212,
        division: "ঢাকা",
      },
    ],
  },
  {
    id: 33,
    slug: "butter",
    name: "মাখন",
    emoji: "🥛",
    category: "dim-dui",
    categoryName: "ডিম-দুধ",
    unit: "কেজি",
    basePrice: 850,
    min: 820,
    max: 880,
    avg: 850,
    changePercent: -1.16,
    markets: [
      {
        bazar: "ধানমন্ডি বাজার",
        price: 880,
        min: 878,
        max: 882,
        division: "ঢাকা",
      },
      {
        bazar: "মোহাম্মদপুর বাজার",
        price: 850,
        min: 848,
        max: 852,
        division: "ঢাকা",
      },
      {
        bazar: "মিরপুর ক্রয় বাজার",
        price: 820,
        min: 818,
        max: 822,
        division: "ঢাকা",
      },
    ],
  },
];

/* ── Deterministic windowed jitter ────────────────────────────────────── */
/**
 * Prices shift ±2% in a 5-minute sliding window so the app still shows fresh prices that
 * stay static across different SSR + React double-renders but don't look frozen.
 */
function current5MinWindow(): number {
  const now = Date.now();
  const fiveMin = 5 * 60 * 1000;
  return Math.floor(now / fiveMin);
}
function seededRand(seed: number): number {
  // Mulberry32
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

let cacheKey = -1;
let cachedProducts: Product[] | null = null;

function buildSeedProducts(): Product[] {
  const win = current5MinWindow();
  if (cacheKey === win && cachedProducts) return cachedProducts;
  const jitter = (idSeed: number) => {
    // ± 2%, deterministic by id + window
    const r = seededRand(win * 7919 + idSeed * 104729);
    return 0.98 + r * 0.04; // 0.98 ~ 1.02
  };
  cachedProducts = RAW.map((r) => {
    const j = jitter(r.id);
    const todayPrice = Math.round(r.basePrice * j);
    const min = Math.round(r.min * j);
    const max = Math.round(r.max * j);
    const avg = Math.round(r.avg * j);
    const prices = r.markets.map((m) => ({
      bazar: m.bazar,
      price: Math.round(m.price * j),
      min: Math.round(m.min * j),
      max: Math.round(m.max * j),
      division: m.division,
    }));
    const dir =
      r.changePercent > 0
        ? "বেড়েছে"
        : r.changePercent < 0
          ? "কমেছে"
          : "অপরিবর্তিত";
    const summary = `সম্প্রতি বাজারে ${r.name}র দাম ${dir}। ${r.markets.length} টি বাজার ভিত্তিক গড় দাম প্রতি ${r.unit}।`;
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      emoji: r.emoji,
      category: r.category,
      categoryName: r.categoryName,
      unit: r.unit,
      summary,
      minPrice: min,
      maxPrice: max,
      avgPrice: avg,
      todayPrice,
      changePercent: r.changePercent,
      prices,
    } as Product;
  });
  cacheKey = win;
  return cachedProducts;
}

export const getSeedProducts = (category?: string): Product[] => {
  const all = buildSeedProducts();
  if (!category) return all;
  return all.filter((p) => p.category === category);
};

export const getSeedCategories = (): Category[] => SEED_CATEGORIES;

export const getSeedProductById = (
  idOrSlug: string | number,
): Product | null => {
  const all = buildSeedProducts();
  const byId = all.find((p) => String(p.id) === String(idOrSlug));
  if (byId) return byId;
  return all.find((p) => p.slug === String(idOrSlug)) || null;
};

export const getSeedCategoryBySlug = (slug: string): Category | null => {
  return SEED_CATEGORIES.find((c) => c.slug === slug || c.id === slug) || null;
};
