import { useShallow } from "zustand/react/shallow";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { useTubeTresholdsFilterStore } from "../store/use-tube-tresholds-filter-store";
import { TubeTresholdsFilterParams } from "./tube-tresholds-filter-params";

export default function TubeTresholdsFilterEmptySelector() {
  const changeFilter = useTubeTresholdsFilterStore(useShallow((state) => state.changeFilter));
  const selectedEmptyOption = useTubeTresholdsFilterStore(useShallow((state) => state.selectedEmptyOption));
  const setSelectedEmptyOptions = useTubeTresholdsFilterStore(useShallow((state) => state.setSelectedEmptyOption));
  const bannedSelectorOptions = [
    { key: 999999, value: "Все" },
    { key: 1, value: "С записями" },
    { key: 2, value: "Без записей" },
  ];

  const bannedOptions = bannedSelectorOptions.map((item) => (
    <FilterSelectorOption key={`banned_option_${item.key}`} id={item.key} value={item.value} />
  ));

  const bannedSelectorProps: FilterSelectorProps = {
    id: TubeTresholdsFilterParams.EMPTY,
    selectedOption: selectedEmptyOption,
    placeholder: "Записи",
    label: "Выбор записей",
    options: bannedOptions,
    setSelectedOption: (id: number) => setSelectedEmptyOptions(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...bannedSelectorProps} />;
}
