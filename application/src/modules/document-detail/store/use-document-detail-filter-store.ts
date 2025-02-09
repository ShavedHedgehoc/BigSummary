import { create } from "zustand";
import { DocumentDetailFilterParams } from "../filter/document-detail-filter-params";

export interface ProductFilterStore {
  filter: FetchDocDetailFilter;
  stateSelectorOptions: IHistoryType[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  fillStateSelectorOptions: (values: IHistoryType[]) => void;
}

export const initFilterValue: FetchDocDetailFilter = {
  productCode: "",
  boil: "",
  marking: "",
  conveyor: "",
  haveRecord: true,
  boilAsc: false,
  states: [],
};

export const useDocumentDetailFilterStore = create<ProductFilterStore>()((set) => ({
  filter: initFilterValue,
  selectedPlant: null,
  plantSelectorOptions: [],
  stateSelectorOptions: [],
  clearFilter: () =>
    set((state) => ({
      filter: {
        ...state.filter,
        productCode: initFilterValue.productCode,
        boil: initFilterValue.boil,
        conveyor: initFilterValue.conveyor,
        marking: initFilterValue.marking,
        states: initFilterValue.states,
      },
    })),

  changeFilter: ({ key, value, values }) => {
    switch (key) {
      case DocumentDetailFilterParams.BOIL:
        set((state) => ({ filter: { ...state.filter, boil: value } }));
        break;
      case DocumentDetailFilterParams.PRODUCT:
        set((state) => ({ filter: { ...state.filter, productCode: value } }));
        break;
      case DocumentDetailFilterParams.MARKING:
        set((state) => ({ filter: { ...state.filter, marking: value } }));
        break;
      case DocumentDetailFilterParams.CONVEYOR:
        set((state) => ({ filter: { ...state.filter, conveyor: value } }));
        break;
      case DocumentDetailFilterParams.BOIL_ASC:
        set((state) => ({ filter: { ...state.filter, boilAsc: value === "true" ? true : false } }));
        break;
      case DocumentDetailFilterParams.STATES:
        set((state) => ({
          filter: { ...state.filter, states: values ? [...values] : [...state.filter.states] },
        }));
        break;
      default:
        break;
    }
  },
  fillStateSelectorOptions: (values) => set(() => ({ stateSelectorOptions: [...values] })),
}));
