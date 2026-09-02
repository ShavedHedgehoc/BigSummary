import { create } from 'zustand';

interface CanHistoryModalStore {
  open: boolean;
  canId: number | null;
  canName: string;
  setOpen: (value: boolean) => void;
  setCanId: (value: number | null) => void;
  setCanName: (value: string) => void;
}
export const useCanHistoryModalStore = create<CanHistoryModalStore>()((set) => ({
  open: false,
  canId: null,
  canName: '',
  setOpen: (value) => set(() => ({ open: value })),
  setCanId: (value) => set(() => ({ canId: value })),
  setCanName: (value) => set(() => ({ canName: value })),
}));
