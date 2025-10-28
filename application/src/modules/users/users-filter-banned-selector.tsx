import { useShallow } from "zustand/react/shallow";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";
import { useUsersFilterStore } from "./store/use-users-filter-store";
import { UsersFilterParams } from "./users-filter-params";

export default function UsersFilterBannedSelector() {
  const changeFilter = useUsersFilterStore(useShallow((state) => state.changeFilter));
  const selectedBannedOption = useUsersFilterStore(useShallow((state) => state.selectedBannedOption));
  const setSelectedBannedOptions = useUsersFilterStore(useShallow((state) => state.setSelectedBannedOption));
  const bannedSelectorOptions = [
    { key: 999999, value: "Все" },
    { key: 1, value: "Активные" },
    { key: 2, value: "Забаненные" },
  ];

  const bannedOptions = bannedSelectorOptions.map((item) => (
    <FilterSelectorOption key={`banned_option_${item.key}`} id={item.key} value={item.value} />
  ));

  const bannedSelectorProps: FilterSelectorProps = {
    id: UsersFilterParams.BANNED,
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
