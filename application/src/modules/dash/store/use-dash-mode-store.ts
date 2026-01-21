import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type DashMode = "tubes" | "packaging";

interface DashModeStore {
  mode: DashMode;
  changeMode: (val: DashMode) => void;
}

export const useDashModeStore = create<DashModeStore>()(
  devtools(
    (set) => ({
      mode: "packaging",
      // mode: "tubes",
      changeMode: (value) => set(() => ({ mode: value })),
    }),
    { name: "DashModeStore", store: "DashModeStore" }
  )
);
