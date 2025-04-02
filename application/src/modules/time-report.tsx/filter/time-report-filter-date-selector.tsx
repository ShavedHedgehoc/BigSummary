import { useShallow } from "zustand/shallow";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import FilterDateInput, { FilterDateInputProps } from "../../../shared/ui/filter-date-input";
import { TimeReportFilterParams } from "./time-report-filter-params";

export default function TimeReportFilterDateInput() {
  const filter = useTimeReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTimeReportFilterStore(useShallow((state) => state.changeFilter));
  const startDateInputProps: FilterDateInputProps = {
    id: TimeReportFilterParams.DATE,
    placeholder: "",
    label: "Дата сводки",
    value: filter.date,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };
  return <FilterDateInput {...startDateInputProps} />;
}
