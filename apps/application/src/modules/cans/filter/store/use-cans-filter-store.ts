import { create } from "zustand";
import { CansFilterParams } from "../cans-filter-params";
import { ITraceCanState } from "../../../../shared/api/services/trace-can-states-service";
import { FetchCansFilter, ITraceCanVolume } from "../../../../shared/api/services/trace-cans-service";

interface ITracePlant {
  PlantPK: number;
  PlantName: string;
  PlantAlias: string;
}

interface CansFilterStore {
  filter: FetchCansFilter;
  selectedPlant: number;
  plantSelectorOptions: ITracePlant[] | [];
  stateSelectorOptions: ITraceCanState[] | [];
  volumeSelectorOptions: ITraceCanVolume[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: ITracePlant[]) => void;
  fillStateSelectorOptions: (values: ITraceCanState[]) => void;
  fillVolumeSelectorOptions: (values: ITraceCanVolume[]) => void;
}

const initFilterValue: FetchCansFilter = {
  can: "",
  states: [],
  plants: [],
  volumes: [],
  transit: false,
};

export const useCansFilterStore = create<CansFilterStore>()((set) => ({
  filter: initFilterValue,
  selectedPlant: 999999,
  plantSelectorOptions: [],
  stateSelectorOptions: [],
  volumeSelectorOptions: [],
  clearFilter: () => set(() => ({ filter: initFilterValue, selectedPlant: 999999 })),
  changeFilter: ({ key, value, values }) => {
    switch (key) {
      case CansFilterParams.CAN:
        set((state) => ({ filter: { ...state.filter, can: value } }));
        break;
      case CansFilterParams.STATES:
        set((state) => ({
          filter: { ...state.filter, states: values ? [...values] : [...state.filter.states] },
        }));
        break;
      case CansFilterParams.VOLUMES:
        set((state) => ({
          filter: { ...state.filter, volumes: values ? [...values] : [...state.filter.volumes] },
        }));
        break;
      case CansFilterParams.PLANTS:
        set((state) => ({
          filter: { ...state.filter, plants: values ? [...values] : [...state.filter.plants] },
        }));
        break;
      case CansFilterParams.TRANSIT:
        set((state) => ({ filter: { ...state.filter, transit: value === "true" ? true : false } }));
        break;
      default:
        break;
    }
  },
  setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
  fillPlantSelectorOptions: (values) =>
    set(() => ({ plantSelectorOptions: [{ PlantPK: 999999, PlantName: "Все", PlantAlias: "" }, ...values] })),
  fillStateSelectorOptions: (values) => set(() => ({ stateSelectorOptions: [...values] })),
  fillVolumeSelectorOptions: (values) => set(() => ({ volumeSelectorOptions: [...values] })),
}));
