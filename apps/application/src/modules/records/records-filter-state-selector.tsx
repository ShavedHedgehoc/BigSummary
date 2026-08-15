import { useShallow } from "zustand/react/shallow";
import { useRecordsFilterStore } from "./store/use-record-filter-store";
import { RecordsFilterParams } from "./records-filter-params";

import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../shared/ui/filter-multi-selector";

export default function RecordsFilterStateSelector() {
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useRecordsFilterStore(useShallow((state) => state.changeFilter));
  const stateSelectorOptions = useRecordsFilterStore(useShallow((state) => state.stateSelectorOptions));

  const stateOptions = stateSelectorOptions.map((state) => (
    <FilterMultiSelectorOption
      key={`state_option_${state.id}`}
      id={state.id}
      value={state.description}
      options={[...filter.states]}
    />
  ));

  const stateSelectorProps: FilterMultiSelectorProps = {
    id: RecordsFilterParams.STATES,
    selectedOptions: filter.states,
    placeholder: "Выберите статус",
    label: "Поиск по статусу",
    options: stateOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
