import { useShallow } from "zustand/shallow";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";
import { BoilsFilterParams } from "./boils-filter-params";
import FilterInputWithSort, { FilterInputWithSortProps } from "../../shared/ui/filter-input-with-sort";

export default function BoilsFilterBatchInput() {
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputWithSortProps = {
    id: BoilsFilterParams.BOIL,
    value: filter.boil,
    sortAscValue: filter.boilAsc,
    sortKey: BoilsFilterParams.BOIL_ASC,
    disabled: filter.boil === "",
    placeholder: "Партия",
    label: "Поиск по партии",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInputWithSort {...inputProps} />;
}
