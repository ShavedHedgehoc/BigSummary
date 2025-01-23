import { useShallow } from "zustand/shallow";
import FilterInput, { FilterInputProps } from "../../shared/ui/filter-input";
import { useDocumentDetailFilterStore } from "./store/use-document-detail-filter-store";
import { DocumentDetailFilterParams } from "./document-detail-filter-params";

export default function DocumentDetailFilterConveyorInput() {
  const filter = useDocumentDetailFilterStore(useShallow((state) => state.filter));
  const changeFilter = useDocumentDetailFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: DocumentDetailFilterParams.CONVEYOR,
    value: filter.conveyor,
    disabled: filter.conveyor === "",
    label: "Поиск по конвейеру",
    placeholder: "Конвейер",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
