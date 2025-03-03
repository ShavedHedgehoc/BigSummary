import { useShallow } from "zustand/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useCansFilterStore } from "./store/use-cans-filter-store";
import { CansFilterParams } from "./cans-filter-params";

export default function CansFilterCanInput() {
  const filter = useCansFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCansFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: CansFilterParams.CAN,
    value: filter.can,
    disabled: filter.can === "",
    placeholder: "Ёмкость",
    label: "Поиск по ёмкости",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
