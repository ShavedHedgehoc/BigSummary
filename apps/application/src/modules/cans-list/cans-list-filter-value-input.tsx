import { useShallow } from "zustand/react/shallow";
import { useCansListFilterStore } from "./store/use-cans-list-filter-store";
import { CansListFilterParams } from "./cans-list-filter-params";
import FilterInputWithSort, { FilterInputWithSortProps } from "../../shared/ui/filter-input-with-sort";

export default function CansListFilterValueInput() {
  const filter = useCansListFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCansListFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputWithSortProps = {
    id: CansListFilterParams.VALUE,
    value: filter.value,
    sortAscValue: filter.valueAsc,
    sortKey: CansListFilterParams.VALUE_ASC,
    disabled: filter.value === "",
    label: "Поиск по ёмкости",
    placeholder: "Ёмкость",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInputWithSort {...inputProps} />;
}
