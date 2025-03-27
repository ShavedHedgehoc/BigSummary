import { useShallow } from "zustand/shallow";
import { useForemanFilterStore } from "../store/use-foreman-filter-store";
import { ForemanFilterParams } from "./foreman-filter-params";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";

export default function ForemanFilterMarkingInput() {
  const filter = useForemanFilterStore(useShallow((state) => state.filter));
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: ForemanFilterParams.MARKING,
    value: filter.marking,
    disabled: filter.marking === "",
    label: "Поиск по артикулу",
    placeholder: "Артикул",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
