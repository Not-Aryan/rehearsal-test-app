// src/store/stylesStore.ts
import { create } from "zustand";
import { fetchAllStyles } from "@/lib/styleService";

export interface StyleItem {
  id: number;
  gender: string;
  masterCategory: string;
  subCategory: string;
  articleType: string;
  baseColour: string;
  season: string;
  year: number;
  usage: string;
  productDisplayName: string;
  imageURL: string;
  priceUSD?: number;
  stock?: number; // Add stock field
}

interface StylesState {
  data: StyleItem[];
  loading: boolean;
  error: string | null;
  fetchStyles: () => Promise<void>;
}

export const useStylesStore = create<StylesState>((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchStyles: async () => {
    set({ loading: true, error: null });
    try {
      const styles = await fetchAllStyles();
      // Add random stock levels to simulate various stock situations
      const stylesWithStock = (styles as StyleItem[]).map((style, index) => {
        let stock: number;
        if (index % 5 === 0) {
          // Every 5th item is out of stock
          stock = 0;
        } else if (index % 7 === 0) {
          // Every 7th item has low stock (1-3 items)
          stock = Math.floor(Math.random() * 3) + 1;
        } else {
          // Regular stock levels
          stock = Math.floor(Math.random() * 50) + 4;
        }
        return { ...style, stock };
      });
      set({ data: stylesWithStock, loading: false });
    } catch (e: unknown) {
      const error = e as Error;
      set({ error: error.message ?? "Failed to load styles", loading: false });
    }
  },
}));
