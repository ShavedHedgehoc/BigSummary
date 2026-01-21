import { create } from "zustand";
import { TubeRecordDetailConsumedMaterial } from "../../../shared/api/services/tube-records-service";

interface TubeRecordMaterialModalStore {
  open: boolean;
  title: string;
  data: TubeRecordDetailConsumedMaterial[] | [];
  setOpen: (value: boolean) => void;
  setTitle: (value: string) => void;
  setData: (value: TubeRecordDetailConsumedMaterial[] | []) => void;
  clearData: () => void;
}

export const useTubeRecordMaterialModalStore = create<TubeRecordMaterialModalStore>()((set) => ({
  open: false,
  title: "",
  data: [],
  setOpen: (value) => set(() => ({ open: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setData: (value) => set(() => ({ data: value })),
  clearData: () => set(() => ({ data: [], title: "" })),
}));
