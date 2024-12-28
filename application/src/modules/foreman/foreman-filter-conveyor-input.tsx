import { useShallow } from "zustand/shallow";
import FilterInput, { FilterInputProps } from "../../shared/ui/filter-input";
import { useForemanFilterStore } from "./store/use-foreman-filter-store";
import { ForemanFilterParams } from "./foreman-filter-params";

export default function ForemanFilterConveyorInput() {
  const filter = useForemanFilterStore(useShallow((state) => state.filter));
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: ForemanFilterParams.CONVEYOR,
    value: filter.conveyor,
    disabled: filter.conveyor === "",
    label: "Поиск по конвейеру",
    placeholder: "Конвейер",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
