import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionOperationStore {
  selectedOperation: string[] | [];
  setSelectedOperation: (val: string[] | []) => void;
}
export const useExtrusionOperationStore = create<ExtrusionOperationStore>()(
  devtools((set) => ({
    selectedOperation: [],
    setSelectedOperation: (value) => set(() => ({ selectedOperation: value })),
  }))
);
