import { useShallow } from "zustand/react/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";
import { TraceBatchWghtReportFilterParams } from "./trace-batch-wght-report-filter-params";

export default function TraceBatchWghtReportFilterBatchInput() {
  const filter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: TraceBatchWghtReportFilterParams.BATCH_NAME,
    value: filter.batchName,
    disabled: filter.batchName === "",
    label: "Поиск по партии",
    placeholder: "Партия",
    maxW: 140,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
