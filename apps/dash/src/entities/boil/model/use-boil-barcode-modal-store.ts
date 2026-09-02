import { create } from 'zustand';

interface BoilBarcodeModalStore {
  open: boolean;
  boil: string;
  code: string;
  marking: string;
  setBoil: (value: string) => void;
  setCode: (value: string) => void;
  setMarking: (value: string) => void;
  setOpen: (value: boolean) => void;
}
export const useBoilBarcodeModalStore = create<BoilBarcodeModalStore>()((set) => ({
  open: false,
  boil: '',
  code: '',
  marking: '',
  setOpen: (value) => set(() => ({ open: value })),
  setBoil: (value) => set(() => ({ boil: value })),
  setCode: (value) => set(() => ({ code: value })),
  setMarking: (value) => set(() => ({ marking: value })),
}));
