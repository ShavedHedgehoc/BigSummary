import { useShallow } from "zustand/react/shallow";
import { useBoilsReportFilterStore } from "../store/use-boils-report-filter-store";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";
import { BoilsReportFilterParams } from "./boils-report-filter-params";

export default function BoilsReportFilterCodeInput() {
  const filter = useBoilsReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsReportFilterStore(useShallow((state) => state.changeFilter));

  const codeInputProps: FilterInputProps = {
    id: BoilsReportFilterParams.BASE,
    value: filter.baseCode,
    disabled: filter.baseCode === "",
    label: "Поиск по коду 1С",
    placeholder: "Код 1С",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...codeInputProps} />;
}
