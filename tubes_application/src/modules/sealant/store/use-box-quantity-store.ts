import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoxQuantityStore {
  quantity: string;
  changeData: (value: string) => void;
  clearData: () => void;
  sliceData: () => void;
  roundData: () => void;
}

export const useBoxQuantityStore = create<BoxQuantityStore>()(
  devtools((set) => ({
    quantity: "0",

    changeData: (value) =>
      set((state) => ({
        quantity:
          state.quantity.length >= 3 || (value === "0" && Number(state.quantity + value) === 0)
            ? state.quantity
            : state.quantity === "0" && value !== "0"
            ? value
            : state.quantity + value,
      })),
    clearData: () => set(() => ({ quantity: "0" })),

    sliceData: () => set((state) => ({ quantity: state.quantity.length < 2 ? "0" : state.quantity.slice(0, -1) })),
    roundData: () => set((state) => ({ quantity: Number(state.quantity).toString() })),
  }))
);
