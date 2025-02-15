import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AddBoilModalStore {
  open: boolean;
  //   boil_id: number | null;
  boil_value: string | null;
  title: string;
  id: number | null;
  state: string | null;
  noteRequired: boolean;
  setOpen: (value: boolean) => void;
  //   setBoilId: (value: number) => void;
  setBoilValue: (value: string | null) => void;
  setTitle: (value: string) => void;
  setState: (value: string | null) => void;
  setId: (value: number | null) => void;

  setNoteRequired: (value: boolean) => void;
}

export const useAddBoilModalStore = create<AddBoilModalStore>()(
  devtools((set) => ({
    open: false,
    // boil_id: null,
    boil_value: null,
    title: "",
    id: null,
    state: null,
    noteRequired: false,
    setOpen: (value) => set(() => ({ open: value })),
    // setBoilId: (value) => set(() => ({ boil_id: value })),
    setBoilValue: (value) => set(() => ({ boil_value: value })),
    setTitle: (value) => set(() => ({ title: value })),
    setNoteRequired: (value) => set(() => ({ noteRequired: value })),
    setState: (value) => set(() => ({ state: value })),
    setId: (value) => set(() => ({ id: value })),
  }))
);
