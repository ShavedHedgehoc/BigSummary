import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RadioEntryModalStore {
  key: string;
  title: string;
  open: boolean;
  expectedValue: string | null | undefined;
  setKey: (val: string) => void;
  setTitle: (val: string) => void;
  setOpen: (val: boolean) => void;
  setExpectedValue: (val: string | null | undefined) => void;
}
export const useExtrusionRadioEntryModalStore = create<RadioEntryModalStore>()(
  devtools((set) => ({
    key: "",
    title: "",
    open: false,
    expectedValue: null,
    setKey: (value) => set(() => ({ key: value })),
    setTitle: (value) => set(() => ({ title: value })),
    setOpen: (value) => set(() => ({ open: value })),
    setExpectedValue: (value) => set(() => ({ expectedValue: value })),
  }))
);
