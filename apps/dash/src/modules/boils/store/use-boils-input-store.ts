import { create } from 'zustand';
import { IBoilListFilter } from '@repo/schemas';

interface BoilsInputStore {
  filter: IBoilListFilter;
  setValue: (value: string) => void;
}

const initFilterValue: IBoilListFilter = {
  baseCode: '',
  boil: '',
  marking: '',
  haveRecord: true,
  boilAsc: false,
  states: [],
  plants: [],
};

export const useBoilsInputStore = create<BoilsInputStore>()((set) => ({
  filter: initFilterValue,
  setValue: (val) => set((state) => ({ filter: { ...state.filter, boil: val } })),
}));
