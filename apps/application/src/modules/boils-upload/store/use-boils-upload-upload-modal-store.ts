import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoilsUploadUploadModalStore {
  open: boolean;
  toProcess: number;
  processed: number;
  success: number;
  fail: number;
  setOpen: (value: boolean) => void;
  setToProcess: (value: number) => void;
  increaseProcessed: () => void;
  increaseSuccess: () => void;
  increaseFail: () => void;
  reset: () => void;
}

export const useBoilsUploadUploadModalStore = create<BoilsUploadUploadModalStore>()(
  devtools((set) => ({
    open: false,
    toProcess: 0,
    processed: 0,
    success: 0,
    fail: 0,
    setOpen: (value) => set(() => ({ open: value })),
    setToProcess: (value) => set(() => ({ toProcess: value })),
    increaseProcessed: () => set((state) => ({ processed: state.processed + 1 })),
    increaseSuccess: () => set((state) => ({ success: state.success + 1 })),
    increaseFail: () => set((state) => ({ fail: state.fail + 1 })),
    reset: () => set(() => ({ open: false, toProcess: 0, processed: 0, success: 0, fail: 0 })),
  }))
);
