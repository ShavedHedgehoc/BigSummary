import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product } from "./types";

interface CurrentProductStore {
  currentProduct: Product;
  setCurrentProduct: (value: Product) => void;
  clearCurrentProduct: () => void;
}

export const useCurrentProductStore = create<CurrentProductStore>()(
  devtools((set) => ({
    currentProduct: {} as Product,
    setCurrentProduct: (value) => set(() => ({ currentProduct: value })),
    clearCurrentProduct: () => set(() => ({ currentProduct: {} as Product })),
  }))
);
