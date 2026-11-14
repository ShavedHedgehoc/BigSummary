import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ExcludedProductItem {
  productId: string;
  productName: string;
}

interface ExcludedProductsState {
  items: ExcludedProductItem[];
  addExcludedProduct: (item: ExcludedProductItem) => void;
  removeExcludedProduct: (productId: string) => void;
  clearExcludedProducts: () => void;
  syncFromIds: (ids: string[], knownProducts?: ExcludedProductItem[]) => void;
}

export const useExcludedProductsStore = create<ExcludedProductsState>()(
  persist(
    (set) => ({
      items: [],

      addExcludedProduct: (newItem) =>
        set((state) => {
          const cleanId = newItem.productId.trim();
          if (!cleanId || state.items.some((i) => i.productId === cleanId)) {
            return state;
          }
          return {
            items: [
              ...state.items,
              { productId: cleanId, productName: newItem.productName || cleanId },
            ],
          };
        }),

      removeExcludedProduct: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId.trim()),
        })),

      clearExcludedProducts: () => set({ items: [] }),

      syncFromIds: (ids, knownProducts = []) =>
        set((state) => {
          const cleanIds = Array.from(new Set(ids.map((id) => id.trim()).filter(Boolean)));

          if (
            cleanIds.length === state.items.length &&
            cleanIds.every((id, idx) => state.items[idx]?.productId === id)
          ) {
            return state;
          }

          const existingMap = new Map(state.items.map((i) => [i.productId, i.productName]));
          const knownMap = new Map(knownProducts.map((i) => [i.productId.trim(), i.productName]));

          const nextItems: ExcludedProductItem[] = cleanIds.map((id) => ({
            productId: id,
            productName: existingMap.get(id) || knownMap.get(id) || '—',
          }));

          return { items: nextItems };
        }),
    }),
    {
      name: 'excluded-products-storage',
    },
  ),
);
