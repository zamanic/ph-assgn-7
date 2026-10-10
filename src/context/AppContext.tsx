"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import type { Product, Category, SortOption } from "@/types";
import {
  fetchCategoriesWithMeta,
  fetchProductsWithMeta,
} from "@/lib/utils";
import toast from "react-hot-toast";

/**
 * AppContext — rewrite to FIX two bugs that caused 4 toast error spam per page load:
 *   1. React.StrictMode double-invoke of useEffect ran init() TWICE.
 *      → Added initOnceRef so only the 1st invocation executes.
 *   2. fetchCategories()/fetchProducts() threw on any HTTP 429/5xx → caught by toast.error()
 *      → Now uses fetch*WithMeta() helpers which return a silent FALLBACK seed dataset
 *        and set fromFallback=true. We show AT MOST 1 info toast per browser
 *        session (sessionStorage sentinel) when both fetches fall back.
 */

interface AppContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  fromFallback: boolean;
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  sortOption: SortOption;
  setSortOption: (s: SortOption) => void;
}

const AppContext = createContext<AppContextType>({
  products: [],
  categories: [],
  loading: true,
  fromFallback: false,
  refreshProducts: async () => {},
  refreshCategories: async () => {},
  sortOption: "default",
  setSortOption: () => {},
});

const FALLBACK_TOAST_KEY = "bazardor.fallback-warned.v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromFallback, setFromFallback] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const initOnceRef = useRef(false);
  const fallbackToastShownRef = useRef(false);

  const showOneFallbackToast = () => {
    if (fallbackToastShownRef.current) return;
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(FALLBACK_TOAST_KEY)) {
        fallbackToastShownRef.current = true;
        return;
      }
      window.sessionStorage.setItem(FALLBACK_TOAST_KEY, "1");
    } catch {
      /* ignore private-mode sessionStorage block */
    }
    fallbackToastShownRef.current = true;
    toast("রিমোট API অনুপলব্ধ — স্থানীয় ডেটা দেখানো হচ্ছে", {
      icon: "ℹ️",
      style: {
        background: "#1D271F",
        color: "#FAFCFA",
        borderRadius: 8,
        fontSize: 14,
        border: "1px solid #2E3A30",
      },
    });
  };

  const refreshProducts = async () => {
    try {
      const { data, fromFallback: fb } = await fetchProductsWithMeta();
      setProducts(data || []);
      if (fb) {
        setFromFallback(true);
        showOneFallbackToast();
      }
    } catch {
      /* Silent — fetch*WithMeta should not throw. Failsafe only */
    }
  };

  const refreshCategories = async () => {
    try {
      const { data, fromFallback: fb } = await fetchCategoriesWithMeta();
      setCategories(data || []);
      if (fb) {
        setFromFallback(true);
        showOneFallbackToast();
      }
    } catch {
      /* Silent — fetch*WithMeta should not throw. Failsafe only */
    }
  };

  useEffect(() => {
    if (initOnceRef.current) return; // StrictMode double-call guard
    initOnceRef.current = true;
    const init = async () => {
      setLoading(true);
      await Promise.all([refreshProducts(), refreshCategories()]);
      setLoading(false);
    };
    init();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        loading,
        fromFallback,
        refreshProducts,
        refreshCategories,
        sortOption,
        setSortOption,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
