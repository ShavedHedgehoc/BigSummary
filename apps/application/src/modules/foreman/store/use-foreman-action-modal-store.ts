import { create } from "zustand";

interface ForemanActionModalStore {
  open: boolean;
  record: IDocRow | null;
  startButtonEnabled: boolean;
  finishButtonEnabled: boolean;
  cancelStartButtonEnabled: boolean;
  cancelFinishButtonEnabled: boolean;
  setOpen: (value: boolean) => void;
  setRecord: (value: IDocRow | null) => void;
  setStartButtonEnabled: (value: boolean) => void;
  setFinishButtonEnabled: (value: boolean) => void;
  setCancelStartButtonEnabled: (value: boolean) => void;
  setCancelFinishButtonEnabled: (value: boolean) => void;
}

export const useForemanActionModalStore = create<ForemanActionModalStore>()((set) => ({
  open: false,
  record: null,
  startButtonEnabled: false,
  finishButtonEnabled: false,
  cancelStartButtonEnabled: false,
  cancelFinishButtonEnabled: false,
  setOpen: (value) => set(() => ({ open: value })),
  setRecord: (value) => set(() => ({ record: value })),
  setStartButtonEnabled: (value) => set(() => ({ startButtonEnabled: value })),
  setFinishButtonEnabled: (value) => set(() => ({ finishButtonEnabled: value })),
  setCancelStartButtonEnabled: (value) => set(() => ({ cancelStartButtonEnabled: value })),
  setCancelFinishButtonEnabled: (value) => set(() => ({ cancelFinishButtonEnabled: value })),
}));
