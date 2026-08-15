import { create } from "zustand";

interface NoteModalStore {
  open: boolean;
  noteId: number;
  setOpen: (value: boolean) => void;
  setNoteId: (value: number) => void;
}

export const useNoteModalStore = create<NoteModalStore>()((set) => ({
  open: false,
  noteId: 0,
  setOpen: (value) => set(() => ({ open: value })),
  setNoteId: (value) => set(() => ({ noteId: value })),
}));
