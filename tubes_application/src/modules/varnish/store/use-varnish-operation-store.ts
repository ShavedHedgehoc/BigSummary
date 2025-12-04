import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface VarnishOperationStore {
  selectedOperation: string[] | [];
  setSelectedOperation: (val: string[] | []) => void;
}
export const useVarnishOperationStore = create<VarnishOperationStore>()(
  devtools((set) => ({
    selectedOperation: [],
    setSelectedOperation: (value) => set(() => ({ selectedOperation: value })),
  }))
);
