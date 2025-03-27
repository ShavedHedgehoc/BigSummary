import { useShallow } from "zustand/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useForemanFilterStore } from "../store/use-foreman-filter-store";
import { ForemanFilterParams } from "./foreman-filter-params";

export default function ForemanFilterCodeInput() {
  const filter = useForemanFilterStore(useShallow((state) => state.filter));
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: ForemanFilterParams.PRODUCT,
    value: filter.productCode,
    disabled: filter.productCode === "",
    label: "Поиск по коду 1С",
    placeholder: "Код 1С",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
