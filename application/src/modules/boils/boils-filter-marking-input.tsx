import { useShallow } from "zustand/shallow";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";
import { BoilsFilterParams } from "./boils-filter-params";
import FilterInput, { FilterInputProps } from "../../shared/ui/filter-input";

export default function BoilsFilterMarkingInput() {
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));

  const markingInputProps: FilterInputProps = {
    id: BoilsFilterParams.MARKING,
    value: filter.marking,
    disabled: filter.marking === "",
    label: "Поиск по артикулу",
    placeholder: "Артикул",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...markingInputProps} />;
}
