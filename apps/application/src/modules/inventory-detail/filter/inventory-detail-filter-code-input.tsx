import { useShallow } from "zustand/react/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useInventoryDetailFilterStore } from "../store/inventory-detail-filter-store";
import { InventoryDetailFilterParams } from "../store/inventory-detail-filter-params";

export default function InventoryDetailFilterCodeInput() {
  const filter = useInventoryDetailFilterStore(useShallow((state) => state.filter));
  const changeFilter = useInventoryDetailFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: InventoryDetailFilterParams.PRODUCT,
    value: filter.productCode,
    disabled: filter.productCode === "",
    label: "Поиск по коду 1С",
    placeholder: "Код 1С",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
