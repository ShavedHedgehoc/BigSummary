import { create } from "zustand";

interface DashTubePostStopModalStore {
  open: boolean;
  summary_id: number | null;
  post_id: number | null;
  defectValue: string;
  title: string;
  setOpen: (value: boolean) => void;
  setTitle: (value: string) => void;
  setSummaryId: (value: number | null) => void;
  setPostId: (value: number | null) => void;
  setDefectValue: (value: string) => void;
  clearData: () => void;
}

export const useDashTubePostStopModalStore = create<DashTubePostStopModalStore>()((set) => ({
  open: false,
  summary_id: null,
  post_id: null,
  defectValue: "0",
  title: "",
  setOpen: (value) => set(() => ({ open: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setSummaryId: (value) => set(() => ({ summary_id: value })),
  setPostId: (value) => set(() => ({ post_id: value })),
  setDefectValue: (value) => set(() => ({ defectValue: value })),
  clearData: () => set(() => ({ defectValue: "0", summary_id: null, post_id: null })),
}));
