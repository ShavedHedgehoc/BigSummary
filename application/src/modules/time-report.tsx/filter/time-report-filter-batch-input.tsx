import { useShallow } from "zustand/react/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { TimeReportFilterParams } from "./time-report-filter-params";

export default function TimeReportFilterBatchInput() {
  const filter = useTimeReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTimeReportFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: TimeReportFilterParams.BOIL,
    value: filter.boil,
    disabled: filter.boil === "",
    placeholder: "Партия",
    label: "Поиск по партии",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
