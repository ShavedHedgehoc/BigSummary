import { useShallow } from "zustand/shallow";
import { useBoilsReportFilterStore } from "../store/use-boils-report-filter-store";
import { BoilsReportFilterParams } from "./boils-report-filter-params";
import FilterInput, { FilterInputProps } from "../../../shared/ui/filter-input";

export default function BoilsReportFilterMarkingInput() {
  const filter = useBoilsReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsReportFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: BoilsReportFilterParams.MARKING,
    value: filter.marking,
    disabled: filter.marking === "",
    label: "Поиск по артикулу",
    placeholder: "Артикул",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
