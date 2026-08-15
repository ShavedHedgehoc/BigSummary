import { create } from "zustand";
import { ITraceBatchWghtReportDetailData } from "../../../shared/api/services/trace-batchs-service";

interface TraceBatchWghtReportDetailDeleteModalStore {
  open: boolean;
  row: ITraceBatchWghtReportDetailData | null;
  title: string;
  setOpen: (value: boolean) => void;
  setRow: (row: ITraceBatchWghtReportDetailData | null) => void;
  setTitle: (value: string) => void;
}

export const useTraceBatchWghtReportDetailDeleteModalStore = create<TraceBatchWghtReportDetailDeleteModalStore>()(
  (set) => ({
    open: false,
    row: null,
    title: "",
    setOpen: (value) => set(() => ({ open: value })),
    setRow: (value) => set(() => ({ row: value })),
    setTitle: (value) => set(() => ({ title: value })),
  })
);
