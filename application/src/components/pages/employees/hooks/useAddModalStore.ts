import { create } from "zustand";

interface AddModalStore {
  open: boolean;
  name: string;
  barcode: string;
  occupation: number | null;

  setOpen: (val: boolean) => void;

  setName: (val: string) => void;
  setBarcode: (val: string) => void;
  setOccupation: (val: number) => void;
  clearData: () => void;
}
export const useAddModalStore = create<AddModalStore>()((set) => ({
  open: false,
  name: "",
  barcode: "",
  occupation: null,
  setOpen: (val: boolean) => set(() => ({ open: val })),
  setName: (val: string) => set(() => ({ name: val })),
  setBarcode: (val: string) => set(() => ({ barcode: val })),
  setOccupation: (val: number) => set(() => ({ occupation: val })),
  clearData: () => set(() => ({ name: "", barcode: "", occupation: null })),
}));

// import { create } from "zustand";

// // никода не экспортируем сам хук с его методами доступа к хранилищу!
// const useCounterStore = create(() => ({
//   count: 0,
// }));

// // экспортируем пользовательский хук - не даем доступ ко всему содержимому хранилища
// export const useCounter = () => useCounterStore((state) => state.count);

// // экспортируем метод
// export const increment = () => {
//   const state = useCounterStore.getState();
//   useCounterStore.setState({ count: state.count + 1 });
// };
