import { create } from "zustand";

import { IPlant } from "../../../types";
import { devtools } from "zustand/middleware";
import { TimeReportFilterParams } from "../filter/time-report-filter-params";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";

interface TimeReportFilter {
  boil: string;
  productCode: string;
  marking: string;
  conveyor: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  plant: number | null;
  date: string;
}

interface TimeReportFilterStore {
  filter: TimeReportFilter;
  selectedPlant: number | null;
  plantSelectorOptions: IPlant[] | [];
  stateSelectorOptions: IHistoryType[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
  fillStateSelectorOptions: (values: IHistoryType[]) => void;
}

const initFilterValue: TimeReportFilter = {
  date: getCurrentDay().toJSON().slice(0, 10),
  productCode: "",
  boil: "",
  marking: "",
  conveyor: "",
  haveRecord: true,
  boilAsc: false,
  states: [],
  plant: null,
};

export const useTimeReportFilterStore = create<TimeReportFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedPlant: null,
    plantSelectorOptions: [],
    stateSelectorOptions: [],
    clearFilter: () =>
      set((state) => ({
        filter: {
          ...state.filter,
          date: getCurrentDay().toJSON().slice(0, 10),
          productCode: initFilterValue.productCode,
          boil: initFilterValue.boil,
          conveyor: initFilterValue.conveyor,
          marking: initFilterValue.marking,
          states: initFilterValue.states,
        },
      })),

    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case TimeReportFilterParams.DATE:
          set((state) => ({ filter: { ...state.filter, date: value } }));
          break;
        case TimeReportFilterParams.BOIL:
          set((state) => ({ filter: { ...state.filter, boil: value } }));
          break;
        case TimeReportFilterParams.PLANT:
          set((state) => ({ filter: { ...state.filter, plant: values?.length ? values[0] : state.filter.plant } }));
          break;
        case TimeReportFilterParams.PRODUCT:
          set((state) => ({ filter: { ...state.filter, productCode: value } }));
          break;
        case TimeReportFilterParams.MARKING:
          set((state) => ({ filter: { ...state.filter, marking: value } }));
          break;
        case TimeReportFilterParams.CONVEYOR:
          set((state) => ({ filter: { ...state.filter, conveyor: value } }));
          break;
        case TimeReportFilterParams.BOIL_ASC:
          set((state) => ({ filter: { ...state.filter, boilAsc: value === "true" ? true : false } }));
          break;
        case TimeReportFilterParams.STATES:
          set((state) => ({
            filter: { ...state.filter, states: values ? [...values] : [...state.filter.states] },
          }));
          break;
        default:
          break;
      }
    },
    setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
    fillPlantSelectorOptions: (values) => set(() => ({ plantSelectorOptions: [...values] })),
    fillStateSelectorOptions: (values) => set(() => ({ stateSelectorOptions: [...values] })),
  }))
);
