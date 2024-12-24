import { useShallow } from "zustand/shallow";

import FilterInputWithSort, { FilterInputWithSortProps } from "../../shared/ui/filter-input-with-sort";
import { useEmployeesFilterStore } from "./store/use-employees-filter-store";
import { EmployeesFilterParams } from "./employees-filter-params";

export default function EmployeesFilterNameInput() {
  const filter = useEmployeesFilterStore(useShallow((state) => state.filter));
  const changeFilter = useEmployeesFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputWithSortProps = {
    id: EmployeesFilterParams.NAME,
    value: filter.name,
    sortAscValue: filter.nameAsc,
    sortKey: EmployeesFilterParams.NAME_ASC,
    disabled: filter.name === "",
    placeholder: "ФИО",
    label: "Поиск по ФИО",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInputWithSort {...inputProps} />;
}
