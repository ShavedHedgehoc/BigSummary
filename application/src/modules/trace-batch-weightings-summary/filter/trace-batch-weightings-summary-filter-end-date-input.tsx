import { useShallow } from "zustand/shallow";
import FilterDateInput, { FilterDateInputProps } from "../../../shared/ui/filter-date-input";
import { useTraceBatchWeightingsSummaryFilterStore } from "../store/use-trace-batch-weightings-summary-filter-store";
import { TraceBatchWeightingsSummaryFilterParams } from "./trace-batch-weightings-summary-filter-params";

export default function TraceBatchWeightingsSummaryFilterEndDateInput() {
  const filter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.changeFilter));
  const endDateInputProps: FilterDateInputProps = {
    id: TraceBatchWeightingsSummaryFilterParams.END_DATE,
    placeholder: "",
    label: "Дата окончания",
    value: filter.endDate,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };
  return <FilterDateInput {...endDateInputProps} />;
}
