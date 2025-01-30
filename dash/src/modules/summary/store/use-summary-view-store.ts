import { create } from "zustand";

interface SummaryViewStore {
  cardsView: boolean;
  setCardsView: (value: boolean) => void;
}

export const useSummaryViewStore = create<SummaryViewStore>()((set) => ({
  cardsView: true,
  setCardsView: (value) => set(() => ({ cardsView: value })),
}));
