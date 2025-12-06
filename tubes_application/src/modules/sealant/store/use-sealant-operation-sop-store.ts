import type { IOperation } from "@/shared/api/services/summary-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SealantOperationStore {
  selectedOperation: IOperation | null;
  setSelectedOperation: (val: IOperation | null) => void;
  clearSelectedOperation: () => void;
}
export const useSealantOperationSopStore = create<SealantOperationStore>()(
  devtools((set) => ({
    selectedOperation: null,
    setSelectedOperation: (value) => set(() => ({ selectedOperation: value })),
    clearSelectedOperation: () => set(() => ({ selectedOperation: null })),
  }))
);
