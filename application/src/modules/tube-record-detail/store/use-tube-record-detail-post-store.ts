import { create } from "zustand";

export type TubePostName = "extrusion" | "varnish" | "offset" | "sealant";
interface TubeRecordDetailPostStore {
  post: TubePostName;
  setPostName: (val: TubePostName) => void;
}

export const useTubeRecordDetailPostStore = create<TubeRecordDetailPostStore>()((set) => ({
  post: "extrusion",
  setPostName: (val) => set(() => ({ post: val })),
}));
