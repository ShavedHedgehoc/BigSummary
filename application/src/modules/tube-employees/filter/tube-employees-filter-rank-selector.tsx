import { useShallow } from "zustand/react/shallow";
import { useTubeEmployeesFilterStore } from "../store/use-tube-employees-filter-store";
import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../../shared/ui/filter-multi-selector";
import { TubeEmployeesFilterParams } from "./tube-employees-filter-params";

export default function TubeEmployeesFilterRankSelector() {
  const filter = useTubeEmployeesFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTubeEmployeesFilterStore(useShallow((state) => state.changeFilter));
  const rankSelectorOptions = useTubeEmployeesFilterStore(useShallow((state) => state.rankSelectorOptions));

  const stateOptions = rankSelectorOptions.map((state) => (
    <FilterMultiSelectorOption
      key={`state_option_${state.id}`}
      id={state.id}
      value={state.description}
      options={[...filter.ranks]}
    />
  ));

  const stateSelectorProps: FilterMultiSelectorProps = {
    id: TubeEmployeesFilterParams.RANKS,
    selectedOptions: filter.ranks,
    placeholder: "Выберите разряд",
    label: "Поиск по разряду",
    options: stateOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
