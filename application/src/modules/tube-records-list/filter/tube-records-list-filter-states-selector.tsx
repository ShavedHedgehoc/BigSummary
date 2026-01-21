import { useShallow } from "zustand/react/shallow";
import { useTubeRecordsListFilterStore } from "../store/use-tube-records-list-filter-store";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { TubeRecordsListFilterParams } from "./tube-records-list-filter-params";

export default function TubeRecordsListFilterStateSelector() {
  const changeFilter = useTubeRecordsListFilterStore(useShallow((state) => state.changeFilter));
  const selectedStateOption = useTubeRecordsListFilterStore(useShallow((state) => state.selectedStateOption));
  const setSelectedStateOption = useTubeRecordsListFilterStore(useShallow((state) => state.setSelectedStateOption));

  const stateSelectorOptions = [
    { key: 999999, value: "Все" },
    { key: 1, value: "Активные" },
    { key: 2, value: "Завершенные" },
  ];

  const stateOptions = stateSelectorOptions.map((item) => (
    <FilterSelectorOption key={`state_option_${item.key}`} id={item.key} value={item.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: TubeRecordsListFilterParams.STATES,
    selectedOption: selectedStateOption,
    placeholder: "Выберите статус",
    label: "Выбор статуса",
    options: stateOptions,
    setSelectedOption: (id: number) => setSelectedStateOption(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...plantSelectorProps} />;
}
