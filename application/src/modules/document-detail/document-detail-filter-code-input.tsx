import { useShallow } from "zustand/shallow";
import FilterInput, { FilterInputProps } from "../../shared/ui/filter-input";
import { useDocumentDetailFilterStore } from "./store/use-document-detail-filter-store";
import { DocumentDetailFilterParams } from "./document-detail-filter-params";

export default function DocumentDetailFilterCodeInput() {
  const filter = useDocumentDetailFilterStore(useShallow((state) => state.filter));
  const changeFilter = useDocumentDetailFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: DocumentDetailFilterParams.PRODUCT,
    value: filter.productCode,
    disabled: filter.productCode === "",
    label: "Поиск по коду 1С",
    placeholder: "Код 1С",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
