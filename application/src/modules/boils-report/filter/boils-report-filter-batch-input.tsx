import { useShallow } from "zustand/shallow";
import { useBoilsReportFilterStore } from "../store/use-boils-report-filter-store";
import FilterInputWithSort, { FilterInputWithSortProps } from "../../../shared/ui/filter-input-with-sort";
import { BoilsReportFilterParams } from "./boils-report-filter-params";

export default function BoilsReportFilterBatchInput() {
  const filter = useBoilsReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsReportFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputWithSortProps = {
    id: BoilsReportFilterParams.BOIL,
    value: filter.boil,
    sortAscValue: filter.boilAsc,
    sortKey: BoilsReportFilterParams.BOIL_ASC,
    disabled: filter.boil === "",
    placeholder: "Партия",
    label: "Поиск по партии",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInputWithSort {...inputProps} />;
}
