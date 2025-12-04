import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OffsetOperationStore {
  selectedOperation: string[] | [];
  setSelectedOperation: (val: string[] | []) => void;
}
export const useOffsetOperationStore = create<OffsetOperationStore>()(
  devtools((set) => ({
    selectedOperation: [],
    setSelectedOperation: (value) => set(() => ({ selectedOperation: value })),
  }))
);
