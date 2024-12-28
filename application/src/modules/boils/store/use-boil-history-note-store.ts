import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoilHistoryNoteStore {
  historyNote: string;
  setHistoryNote: (value: string) => void;
}

export const useBoilHistoryNoteStore = create<BoilHistoryNoteStore>()(
  devtools((set) => ({
    historyNote: "",
    setHistoryNote: (value) => set(() => ({ historyNote: value })),
  }))
);
