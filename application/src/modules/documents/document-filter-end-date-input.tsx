import { useShallow } from "zustand/shallow";
import FilterDateInput, { FilterDateInputProps } from "../../shared/ui/filter-date-input";
import { DocumentsFilterParams } from "./documents-filter-params";
import { useDocumentsFilterStore } from "./store/use-documents-filter-store";

export default function DocumentFilterEndDateInput() {
  const filter = useDocumentsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useDocumentsFilterStore(useShallow((state) => state.changeFilter));
  const endDateInputProps: FilterDateInputProps = {
    id: DocumentsFilterParams.END_DATE,
    placeholder: "",
    label: "Дата окончания",
    value: filter.endDate,
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };
  return <FilterDateInput {...endDateInputProps} />;
}
