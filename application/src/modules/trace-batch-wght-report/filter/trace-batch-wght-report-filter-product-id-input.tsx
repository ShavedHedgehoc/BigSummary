import { useShallow } from "zustand/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";
import { TraceBatchWghtReportFilterParams } from "./trace-batch-wght-report-filter-params";

export default function TraceBatchWghtReportFilterProductIdInput() {
  const filter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: TraceBatchWghtReportFilterParams.PRODUCT_ID,
    value: filter.productId,
    disabled: filter.productId === "",
    label: "Поиск по коду 1С",
    placeholder: "Код 1С",
    maxW: 120,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
