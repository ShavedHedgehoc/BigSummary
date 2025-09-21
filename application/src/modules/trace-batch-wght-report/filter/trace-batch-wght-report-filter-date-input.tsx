import { useShallow } from "zustand/shallow";
import FilterDateInput, { FilterDateInputProps } from "../../../shared/ui/filter-date-input";
import { TraceBatchWghtReportFilterParams } from "./trace-batch-wght-report-filter-params";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";

export default function TraceBatchWghtReportFilterStartDateInput() {
  const filter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.changeFilter));
  const startDateInputProps: FilterDateInputProps = {
    id: TraceBatchWghtReportFilterParams.BATCH_DATE,
    placeholder: "",
    label: "Дата варок",
    value: filter.batchDate,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };
  return <FilterDateInput {...startDateInputProps} />;
}
