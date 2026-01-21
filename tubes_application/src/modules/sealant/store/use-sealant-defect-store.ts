import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SealantDefectStore {
  data: string;
  initData: () => void;
  changeData: (value: string) => void;
  clearData: () => void;
  sliceData: () => void;
  roundData: () => void;
}

export const useSealantDefectStore = create<SealantDefectStore>()(
  devtools((set) => ({
    data: "0",

    clearData: () => set(() => ({ data: "0" })),
    sliceData: () => set((state) => ({ data: state.data.length < 2 ? "0" : state.data.slice(0, -1) })),
    changeData: (value) =>
      set((state) => ({
        data:
          (state.data.includes(".") && value == ".") || state.data.length >= 8
            ? state.data
            : value == "."
            ? state.data + value
            : value === "0" && Number(state.data + value) === 0 && state.data.includes(".")
            ? state.data + value
            : value === "0" && Number(state.data + value) !== 0
            ? state.data + value
            : Number(state.data + value).toString(),
      })),
    roundData: () =>
      set((state) => ({
        data: Number(state.data).toString(),
      })),
  }))
);
