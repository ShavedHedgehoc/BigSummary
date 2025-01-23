import { useShallow } from "zustand/shallow";

import FilterInput, { FilterInputProps } from "../../shared/ui/filter-input";
import { useDocumentDetailFilterStore } from "./store/use-document-detail-filter-store";
import { DocumentDetailFilterParams } from "./document-detail-filter-params";

export default function DocumentDetailFilterBatchInput() {
  const filter = useDocumentDetailFilterStore(useShallow((state) => state.filter));
  const changeFilter = useDocumentDetailFilterStore(useShallow((state) => state.changeFilter));

  const inputProps: FilterInputProps = {
    id: DocumentDetailFilterParams.BOIL,
    value: filter.boil,
    disabled: filter.boil === "",
    placeholder: "Партия",
    label: "Поиск по партии",
    changeFilter: ({ key, value }: { key: string; value: string }) => changeFilter({ key, value }),
  };

  return <FilterInput {...inputProps} />;
}
