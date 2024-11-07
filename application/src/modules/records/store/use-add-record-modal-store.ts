import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AddRecordModalStore {
  open: boolean;
  record_id: number | null;
  title: string;
  //   id: number | null;
  state: string | null;
  noteRequired: boolean;
  setOpen: (value: boolean) => void;
  setRecordId: (value: number) => void;
  setTitle: (value: string) => void;
  setState: (value: string | null) => void;
  //   setId: (value: number | null) => void;

  setNoteRequired: (value: boolean) => void;
}

export const useAddRecordModalStore = create<AddRecordModalStore>()(
  devtools((set) => ({
    open: false,
    record_id: null,
    title: "",
    id: null,
    state: null,
    noteRequired: false,
    setOpen: (value) => set(() => ({ open: value })),
    setRecordId: (value) => set(() => ({ record_id: value })),
    setTitle: (value) => set(() => ({ title: value })),
    setNoteRequired: (value) => set(() => ({ noteRequired: value })),
    setState: (value) => set(() => ({ state: value })),
    // setId: (value) => set(() => ({ id: value })),
  }))
);
