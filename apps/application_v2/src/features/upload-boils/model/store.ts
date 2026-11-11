import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface BoilsUploadUploadComponentStore {
  isProcessed: boolean;
  toProcess: number;
  processed: number;
  success: number;
  fail: number;
  setIsProcessed: (value: boolean) => void;
  setToProcess: (value: number) => void;
  increaseProcessed: () => void;
  increaseSuccess: () => void;
  increaseFail: () => void;
  reset: () => void;
}

export const useBoilsUploadUploadComponentStore = create<BoilsUploadUploadComponentStore>()(
  devtools((set) => ({
    isProcessed: false,
    toProcess: 0,
    processed: 0,
    success: 0,
    fail: 0,
    setIsProcessed: (value) => set(() => ({ isProcessed: value })),
    setToProcess: (value) => set(() => ({ toProcess: value })),
    increaseProcessed: () => set((state) => ({ processed: state.processed + 1 })),
    increaseSuccess: () => set((state) => ({ success: state.success + 1 })),
    increaseFail: () => set((state) => ({ fail: state.fail + 1 })),
    reset: () => set(() => ({ open: false, toProcess: 0, processed: 0, success: 0, fail: 0 })),
  })),
);
