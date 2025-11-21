import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BooleanEntryModalStore {
  key: string;
  title: string;
  open: boolean;
  setKey: (val: string) => void;
  setTitle: (val: string) => void;
  setOpen: (val: boolean) => void;
}
export const useOffsetBooleanEntryModalStore = create<BooleanEntryModalStore>()(
  devtools((set) => ({
    key: "",
    title: "",
    open: false,
    setKey: (value) => set(() => ({ key: value })),
    setTitle: (value) => set(() => ({ title: value })),
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
