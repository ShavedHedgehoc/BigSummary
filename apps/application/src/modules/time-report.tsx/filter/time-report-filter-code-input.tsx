import { useShallow } from "zustand/react/shallow";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { TimeReportFilterParams } from "./time-report-filter-params";

export default function TimeReportFilterCodeInput() {
  const filter = useTimeReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTimeReportFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: TimeReportFilterParams.PRODUCT,
    value: filter.productCode,
    disabled: filter.productCode === "",
    label: "Поиск по коду 1С",
    placeholder: "Код 1С",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
