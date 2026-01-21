import { useShallow } from "zustand/react/shallow";
import FilterInputWithSort, { FilterInputWithSortProps } from "../../../shared/ui/filter-input-with-sort";
import { useTubeEmployeesFilterStore } from "../store/use-tube-employees-filter-store";
import { TubeEmployeesFilterParams } from "./tube-employees-filter-params";

export default function TubeEmployeesFilterNameInput() {
  const filter = useTubeEmployeesFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTubeEmployeesFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputWithSortProps = {
    id: TubeEmployeesFilterParams.NAME,
    value: filter.name,
    sortAscValue: filter.nameAsc,
    sortKey: TubeEmployeesFilterParams.NAME_ASC,
    disabled: filter.name === "",
    placeholder: "ФИО",
    label: "Поиск по ФИО",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInputWithSort {...inputProps} />;
}
