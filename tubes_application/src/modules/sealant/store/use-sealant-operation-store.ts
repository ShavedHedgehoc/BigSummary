import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SealantOperationStore {
  selectedOperation: string[] | [];
  setSelectedOperation: (val: string[] | []) => void;
}
export const useSealantOperationStore = create<SealantOperationStore>()(
  devtools((set) => ({
    selectedOperation: [],
    setSelectedOperation: (value) => set(() => ({ selectedOperation: value })),
  }))
);
