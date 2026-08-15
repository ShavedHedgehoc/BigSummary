import { create } from "zustand";

import { devtools } from "zustand/middleware";

interface DocumentDetailAddHistoryModalFormStore {
  selectedHistoryType: string | null;
  historyNote: string;
  historyTypeSelectorOptions: IHistoryType[] | [];
  setSelectedHistoryType: (value: string) => void;
  setHistoryNote: (value: string) => void;
  fillHistoryTypeSelectorOptions: (values: IHistoryType[]) => void;
}

export const useDocumentDetailAddHistoryModalFormStore = create<DocumentDetailAddHistoryModalFormStore>()(
  devtools((set) => ({
    selectedHistoryType: null,
    historyNote: "",
    historyTypeSelectorOptions: [],
    setSelectedHistoryType: (value) => set(() => ({ selectedHistoryType: value })),
    setHistoryNote: (value) => set(() => ({ historyNote: value })),
    fillHistoryTypeSelectorOptions: (values) => set(() => ({ historyTypeSelectorOptions: [...values] })),
  }))
);
