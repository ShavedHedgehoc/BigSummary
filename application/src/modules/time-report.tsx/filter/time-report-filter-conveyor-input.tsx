import { useShallow } from "zustand/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { TimeReportFilterParams } from "./time-report-filter-params";

export default function TimeReportFilterConveyorInput() {
  const filter = useTimeReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTimeReportFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: TimeReportFilterParams.CONVEYOR,
    value: filter.conveyor,
    disabled: filter.conveyor === "",
    label: "Поиск по конвейеру",
    placeholder: "Конвейер",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
