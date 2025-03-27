import { useShallow } from "zustand/shallow";
import { useForemanFilterStore } from "../store/use-foreman-filter-store";
import { ForemanFilterParams } from "./foreman-filter-params";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";

export default function ForemanFilterBatchInput() {
  const filter = useForemanFilterStore(useShallow((state) => state.filter));
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: ForemanFilterParams.BOIL,
    value: filter.boil,
    disabled: filter.boil === "",
    placeholder: "Партия",
    label: "Поиск по партии",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
