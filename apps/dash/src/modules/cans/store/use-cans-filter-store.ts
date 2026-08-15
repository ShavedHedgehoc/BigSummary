import { create } from "zustand";
import { FetchCansFilter, ITraceCanVolume } from "../../../shared/api/services/trace-can-service";
import { CansFilterParams } from "../cans-filter/cans-filter-params";
import { ITracePlant } from "../../../shared/api/services/trace-plant-service";
import { ITraceCanState } from "../../../shared/api/services/trace-can-state-service";

interface FilterFormField {
  key: string;
  value: string;
  values?: number[];
}

interface CansFilterStore {
  filter: FetchCansFilter;
  selectedPlant: ITracePlant;
  plantSelectorOptions: ITracePlant[] | [];
  stateSelectorOptions: ITraceCanState[] | [];
  volumeSelectorOptions: ITraceCanVolume[] | [];
  clearFilter: () => void;
  changeFilter: (value: FilterFormField) => void;
  setSelectedPlant: (value: ITracePlant) => void;
  fillPlantSelectorOptions: (values: ITracePlant[]) => void;
  fillStateSelectorOptions: (values: ITraceCanState[]) => void;
  fillVolumeSelectorOptions: (values: ITraceCanVolume[]) => void;
}

export const initCansFilterValue: FetchCansFilter = {
  can: "",
  states: [],
  plants: [],
  volumes: [],
  transit: false,
};

export const useCansFilterStore = create<CansFilterStore>()((set) => ({
  filter: initCansFilterValue,
  selectedPlant: { PlantPK: 999999, PlantName: "Все", PlantAlias: "D" },
  plantSelectorOptions: [],
  stateSelectorOptions: [],
  volumeSelectorOptions: [],

  clearFilter: () =>
    set(() => ({ filter: initCansFilterValue, selectedPlant: { PlantPK: 999999, PlantName: "Все", PlantAlias: "D" } })),
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
