import { useShallow } from "zustand/shallow";
import { UsersFilterParams } from "./users-filter-params";

import { useUsersFilterStore } from "./store/use-users-filter-store";
import FilterInputWithSort, { FilterInputWithSortProps } from "../../shared/ui/filter-input-with-sort";

export default function UsersFilterNameInput() {
  const filter = useUsersFilterStore(useShallow((state) => state.filter));
  const changeFilter = useUsersFilterStore(useShallow((state) => state.changeFilter));

  const nameInputProps: FilterInputWithSortProps = {
    id: UsersFilterParams.NAME,
    value: filter.name,
    disabled: filter.name === "",
    label: "Поиск по имени",
    placeholder: "ФИО",
    sortAscValue: filter.nameAsc,
    sortKey: UsersFilterParams.NAME_ASC,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInputWithSort {...nameInputProps} />;
}
