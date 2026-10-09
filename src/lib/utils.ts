const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBangla(num: number | string): string {
  const str = typeof num === "number" ? num.toString() : num;
  return str.replace(/\d/g, (d) => banglaDigits[parseInt(d)]);
}

export function formatPrice(price: number): string {
  const formatted = price.toLocaleString("en-US");
  return toBangla(formatted);
}

export function formatPercent(percent: number): string {
  const abs = Math.abs(percent).toFixed(1);
  return toBangla(abs);
}

export function getBanglaDate(): string {
  const now = new Date();
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
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
  process.env.NEXT_PUBLIC_API_BASE || "https://api.api-store.workers.dev/api/bazardor";

export async function fetchProducts(category?: string): Promise<any[]> {
  const url = category ? `${API_BASE}/products?category=${category}` : `${API_BASE}/products`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: string | number): Promise<any> {
  const res = await fetch(`${API_BASE}/products/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function fetchCategories(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchCategory(slug: string): Promise<any> {
  const res = await fetch(`${API_BASE}/categories/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}
