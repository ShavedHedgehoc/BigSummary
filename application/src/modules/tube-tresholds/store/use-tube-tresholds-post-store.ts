import { create } from "zustand";

export type TubePostName = "extrusion" | "varnish" | "offset" | "sealant";
interface TubeTresholdsPostStore {
  post: TubePostName;
  setPostName: (val: TubePostName) => void;
}

export const useTubeTresholdsPostStore = create<TubeTresholdsPostStore>()((set) => ({
  post: "extrusion",
  setPostName: (val) => set(() => ({ post: val })),
}));
