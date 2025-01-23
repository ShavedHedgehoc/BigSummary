export interface ProductFilterStore {
  filter: FetchProductFilter;
  selectedPlant: number | null;
  plantSelectorOptions: IPlant[] | [];
  stateSelectorOptions: IHistoryType[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
  fillStateSelectorOptions: (values: IHistoryType[]) => void;
}

export const initFilterValue: FetchProductFilter = {
  productCode: "",
  boil: "",
  marking: "",
  conveyor: "",
  haveRecord: true,
  boilAsc: false,
  states: [],
  plant: null,
};
