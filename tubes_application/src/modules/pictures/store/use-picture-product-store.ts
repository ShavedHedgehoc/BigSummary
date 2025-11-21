import type { IProduct } from "@/shared/api/services/product-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PictureProductStore {
  pictureProduct: IProduct | null;
  setPictureProduct: (val: IProduct) => void;
  clearPictureProduct: () => void;
}

export const usePictureProductStore = create<PictureProductStore>()(
  devtools((set) => ({
    pictureProduct: null,
    setPictureProduct: (value) => set(() => ({ pictureProduct: value })),
    clearPictureProduct: () => set(() => ({ pictureProduct: null })),
  }))
);
