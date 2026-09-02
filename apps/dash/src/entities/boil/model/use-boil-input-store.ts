import { create } from 'zustand';
import { IBoilListFilter } from '@repo/schemas';

interface BoilInputStore {
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

export const useBoilInputStore = create<BoilInputStore>()((set) => ({
  filter: initFilterValue,
  setValue: (val) => set((state) => ({ filter: { ...state.filter, boil: val } })),
}));
