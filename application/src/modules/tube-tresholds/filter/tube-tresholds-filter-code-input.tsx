import { useShallow } from "zustand/react/shallow";
import { TubeTresholdsFilterParams } from "./tube-tresholds-filter-params";
import { useTubeTresholdsFilterStore } from "../store/use-tube-tresholds-filter-store";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";

export default function TubeTresholdsFilterCodeInput() {
  const filter = useTubeTresholdsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTubeTresholdsFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: TubeTresholdsFilterParams.CODE,
    value: filter.code,

    disabled: filter.code === "",
    placeholder: "Код 1с",
    label: "Поиск по коду",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
