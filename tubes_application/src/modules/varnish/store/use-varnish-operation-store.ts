import type { IOperation } from "@/shared/api/services/summary-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface VarnishOperationStore {
  selectedOperation: IOperation | null;
  setSelectedOperation: (val: IOperation | null) => void;
}
export const useVarnishOperationStore = create<VarnishOperationStore>()(
  devtools((set) => ({
    selectedOperation: null,
    setSelectedOperation: (value) => set(() => ({ selectedOperation: value })),
  }))
);
