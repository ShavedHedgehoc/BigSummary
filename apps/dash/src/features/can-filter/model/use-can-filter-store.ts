import { create } from 'zustand';
import { CanFilterParams } from './can-filter-params';
import {
  IDashTraceCanDataListFilter,
  ITraceCanState,
  ITracePlant,
  TDashTraceCanVolumeItem,
} from '@repo/schemas';

interface FilterFormField {
  key: string;
  value: string;
  values?: number[];
}

interface CanFilterStore {
  filter: IDashTraceCanDataListFilter;
  selectedPlant: ITracePlant;
  plantSelectorOptions: ITracePlant[] | [];
  stateSelectorOptions: ITraceCanState[] | [];
  volumeSelectorOptions: TDashTraceCanVolumeItem[] | [];
  clearFilter: () => void;
  changeFilter: (value: FilterFormField) => void;
  setSelectedPlant: (value: ITracePlant) => void;
  fillPlantSelectorOptions: (values: ITracePlant[]) => void;
  fillStateSelectorOptions: (values: ITraceCanState[]) => void;
  fillVolumeSelectorOptions: (values: TDashTraceCanVolumeItem[]) => void;
}

export const initCanFilterValue: IDashTraceCanDataListFilter = {
  can: '',
  states: [],
  plants: [],
  volumes: [],
  transit: false,
};

export const useCanFilterStore = create<CanFilterStore>()((set) => ({
  filter: initCanFilterValue,
  selectedPlant: { PlantPK: 999999, PlantName: 'Все', PlantAlias: 'D' },
  plantSelectorOptions: [],
  stateSelectorOptions: [],
  volumeSelectorOptions: [],

  clearFilter: () =>
    set(() => ({
      filter: initCanFilterValue,
      selectedPlant: { PlantPK: 999999, PlantName: 'Все', PlantAlias: 'D' },
    })),
  changeFilter: ({ key, value, values }) => {
    switch (key) {
      case CanFilterParams.CAN:
        set((state) => ({ filter: { ...state.filter, can: value } }));
        break;
      case CanFilterParams.STATES:
        set((state) => ({
          filter: { ...state.filter, states: values ? [...values] : [...state.filter.states] },
        }));
        break;
      case CanFilterParams.VOLUMES:
        set((state) => ({
          filter: { ...state.filter, volumes: values ? [...values] : [...state.filter.volumes] },
        }));
        break;
      case CanFilterParams.PLANTS:
        set((state) => ({
          filter: { ...state.filter, plants: values ? [...values] : [...state.filter.plants] },
        }));
        break;
      case CanFilterParams.TRANSIT:
        set((state) => ({ filter: { ...state.filter, transit: value === 'true' ? true : false } }));
        break;
      default:
        break;
    }
  },
  setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
  fillPlantSelectorOptions: (values) =>
    set(() => ({
      plantSelectorOptions: [{ PlantPK: 999999, PlantName: 'Все', PlantAlias: '' }, ...values],
    })),
  fillStateSelectorOptions: (values) => set(() => ({ stateSelectorOptions: [...values] })),
  fillVolumeSelectorOptions: (values) => set(() => ({ volumeSelectorOptions: [...values] })),
}));
