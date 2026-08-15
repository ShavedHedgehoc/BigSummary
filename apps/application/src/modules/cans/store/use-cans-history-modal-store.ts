import { create } from "zustand";

interface CansHistoryModalStore {
  open: boolean;
  can_id: number | null;
  //   boil_value: string | null;
  title: string;
  setOpen: (value: boolean) => void;
  setCanId: (value: number) => void;
  setTitle: (value: string) => void;
  //   setBoilValue: (value: string | null) => void;
}

export const useCansHistoryModalStore = create<CansHistoryModalStore>()((set) => ({
  open: false,
  can_id: null,
  //   boil_value: null,
  title: "",
  setOpen: (value) => set(() => ({ open: value })),
  setCanId: (value) => set(() => ({ can_id: value })),
  setTitle: (value) => set(() => ({ title: value })),
  //   setBoilValue: (value) => set(() => ({ boil_value: value })),
}));
