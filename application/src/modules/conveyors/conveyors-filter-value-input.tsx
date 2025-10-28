import { useShallow } from "zustand/react/shallow";
import { useConveyorsFilterStore } from "./store/use-conveyors-filter-store";
import { ConveyorsFilterParams } from "./conveyors-filter-params";
import FilterInputWithSort, { FilterInputWithSortProps } from "../../shared/ui/filter-input-with-sort";

export default function ConveyorsFilterValueInput() {
  const filter = useConveyorsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useConveyorsFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputWithSortProps = {
    id: ConveyorsFilterParams.VALUE,
    value: filter.value,
    sortAscValue: filter.valueAsc,
    sortKey: ConveyorsFilterParams.VALUE_ASC,
    disabled: filter.value === "",
    label: "Поиск по конвейеру",
    placeholder: "Конвейер",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInputWithSort {...inputProps} />;
}
