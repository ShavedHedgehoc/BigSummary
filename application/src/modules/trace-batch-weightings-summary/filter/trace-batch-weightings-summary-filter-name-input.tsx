import { useShallow } from "zustand/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTraceBatchWeightingsSummaryFilterStore } from "../store/use-trace-batch-weightings-summary-filter-store";
import { TraceBatchWeightingsSummaryFilterParams } from "./trace-batch-weightings-summary-filter-params";

export default function TraceBatchWeightingsSummaryFilterNameInput() {
  const filter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: TraceBatchWeightingsSummaryFilterParams.AUTHOR,
    value: filter.author,
    disabled: filter.author === "",
    label: "Поиск по ФИО",
    placeholder: "ФИО",
    maxW: 150,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
