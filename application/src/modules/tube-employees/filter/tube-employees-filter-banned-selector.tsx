import { useShallow } from "zustand/react/shallow";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";

import { useTubeEmployeesFilterStore } from "../store/use-tube-employees-filter-store";
import { TubeEmployeesFilterParams } from "./tube-employees-filter-params";

export default function TubeEmployeesFilterBannedSelector() {
  const changeFilter = useTubeEmployeesFilterStore(useShallow((state) => state.changeFilter));
  const selectedBannedOption = useTubeEmployeesFilterStore(useShallow((state) => state.selectedBannedOption));
  const setSelectedBannedOptions = useTubeEmployeesFilterStore(useShallow((state) => state.setSelectedBannedOption));
  const bannedSelectorOptions = [
    { key: 999999, value: "Все" },
    { key: 1, value: "Активные" },
    { key: 2, value: "Забаненные" },
  ];

  const bannedOptions = bannedSelectorOptions.map((item) => (
    <FilterSelectorOption key={`banned_option_${item.key}`} id={item.key} value={item.value} />
  ));

  const bannedSelectorProps: FilterSelectorProps = {
    id: TubeEmployeesFilterParams.BANNED,
    selectedOption: selectedBannedOption,
    placeholder: "Статус",
    label: "Выбор статуса",
    options: bannedOptions,
    setSelectedOption: (id: number) => setSelectedBannedOptions(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...bannedSelectorProps} />;
}
