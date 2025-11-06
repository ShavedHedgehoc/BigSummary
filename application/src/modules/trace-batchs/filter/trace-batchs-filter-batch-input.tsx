import { useShallow } from "zustand/react/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTraceBatchsFilterStore } from "../store/use-trace-batchs-filter-store";
import { TraceBatchsFilterParams } from "./trace-batchs-filter-params";

export default function TraceBatchsFilterBatchInput() {
  const filter = useTraceBatchsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTraceBatchsFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: TraceBatchsFilterParams.BATCH,
    value: filter.batch,
    disabled: filter.batch === "",
    label: "Поиск по номеру варки",
    placeholder: "Номер варки",
    maxW: 150,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
