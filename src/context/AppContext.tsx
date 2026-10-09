"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { Product, Category, SortOption } from "@/types";
import { fetchCategories, fetchProducts } from "@/lib/utils";
import toast from "react-hot-toast";

interface AppContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
  sortOption: SortOption;
  setSortOption: (s: SortOption) => void;
}

const AppContext = createContext<AppContextType>({
  products: [],
  categories: [],
  loading: true,
  refreshProducts: async () => {},
  refreshCategories: async () => {},
  sortOption: "default",
  setSortOption: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const refreshProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data || []);
    } catch (err) {
      toast.error("পণ্যের ডেটা লোড করতে সমস্যা হয়েছে");
    }
  };

  const refreshCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data || []);
    } catch (err) {
      toast.error("ক্যাটাগরি ডেটা লোড করতে সমস্যা হয়েছে");
    }
  };

  useEffect(() => {
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
