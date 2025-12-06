import type { IOperation } from "@/shared/api/services/summary-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SealantOperationStore {
  selectedOperation: IOperation | null;
  setSelectedOperation: (val: IOperation | null) => void;
}
export const useSealantOperationStore = create<SealantOperationStore>()(
  devtools((set) => ({
    selectedOperation: null,
    setSelectedOperation: (value) => set(() => ({ selectedOperation: value })),
  }))
);
