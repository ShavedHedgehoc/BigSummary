import { useShallow } from "zustand/react/shallow";
import { useTubeRecordsListFilterStore } from "../store/use-tube-records-list-filter-store";
import FilterDateInput, { FilterDateInputProps } from "../../../shared/ui/filter-date-input";
import { TubeRecordsListFilterParams } from "./tube-records-list-filter-params";

export default function TubeRecordsListFilterEndDateInput() {
  const filter = useTubeRecordsListFilterStore(useShallow((state) => state.filter));
  const changeFilter = useTubeRecordsListFilterStore(useShallow((state) => state.changeFilter));
  const endDateInputProps: FilterDateInputProps = {
    id: TubeRecordsListFilterParams.END_DATE,
    placeholder: "",
    label: "Дата окончания",
    value: filter.end_date,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };
  return <FilterDateInput {...endDateInputProps} />;
}
