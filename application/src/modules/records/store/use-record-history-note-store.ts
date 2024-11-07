import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RecordHistoryNoteStore {
  historyNote: string;
  setHistoryNote: (value: string) => void;
}

export const useRecordHistoryNoteStore = create<RecordHistoryNoteStore>()(
  devtools((set) => ({
    historyNote: "",
    setHistoryNote: (value) => set(() => ({ historyNote: value })),
  }))
);
