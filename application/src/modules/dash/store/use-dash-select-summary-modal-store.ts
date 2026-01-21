import { create } from "zustand";

interface DashSelectSummaryModalStore {
  open: boolean;
  conveyor_id: number | null;
  conveyor_name: string | null;
  title: string;
  setOpen: (value: boolean) => void;
  setTitle: (value: string) => void;
  setConveyorId: (value: number | null) => void;
  setConveyorName: (value: string | null) => void;
}

export const useDashSelectSummaryModalStore = create<DashSelectSummaryModalStore>()((set) => ({
  open: false,
  conveyor_id: null,
  conveyor_name: null,
  title: "",
  setOpen: (value) => set(() => ({ open: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setConveyorId: (value) => set(() => ({ conveyor_id: value })),
  setConveyorName: (value) => set(() => ({ conveyor_name: value })),
}));
