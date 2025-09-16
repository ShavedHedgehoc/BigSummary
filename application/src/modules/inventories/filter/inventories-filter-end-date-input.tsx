import { useShallow } from "zustand/shallow";
import FilterDateInput, { FilterDateInputProps } from "../../../shared/ui/filter-date-input";
import { useInventoriesFilterStore } from "../store/use-inventories-filter-store";
import { InventoriesFilterParams } from "./inventories-filter-params";

export default function InventoriesFilterEndDateInput() {
  const filter = useInventoriesFilterStore(useShallow((state) => state.filter));
  const changeFilter = useInventoriesFilterStore(useShallow((state) => state.changeFilter));
  const endDateInputProps: FilterDateInputProps = {
    id: InventoriesFilterParams.END_DATE,
    placeholder: "",
    label: "Дата окончания",
    value: filter.endDate,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };
  return <FilterDateInput {...endDateInputProps} />;
}
