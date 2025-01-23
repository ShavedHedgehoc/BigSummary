import { useShallow } from "zustand/shallow";

import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "../../shared/api/services/history-types-service";

import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../shared/ui/filter-multi-selector";
import { useDocumentDetailFilterStore } from "./store/use-document-detail-filter-store";
import { DocumentDetailFilterParams } from "./document-detail-filter-params";

export default function DocumentDetailFilterStateSelector() {
  const filter = useDocumentDetailFilterStore(useShallow((state) => state.filter));
  const changeFilter = useDocumentDetailFilterStore(useShallow((state) => state.changeFilter));
  const stateSelectorOptions = useDocumentDetailFilterStore(useShallow((state) => state.stateSelectorOptions));
  const fillStateSelectorOptions = useDocumentDetailFilterStore(useShallow((state) => state.fillStateSelectorOptions));

  useQuery({
    queryKey: ["product_state_options"],
    queryFn: async () => {
      const data = await HistoryTypeService.getProductsHistoryTypes();
      if (data) {
        fillStateSelectorOptions(data);
        return data;
      }
    },
  });

  const stateOptions = stateSelectorOptions.map((state) => (
    <FilterMultiSelectorOption
      key={`state_option_${state.id}`}
      id={state.id}
      value={state.description}
      options={[...filter.states]}
    />
  ));

  const stateSelectorProps: FilterMultiSelectorProps = {
    id: DocumentDetailFilterParams.STATES,
    selectedOptions: filter.states,
    placeholder: "Выберите статус",
    label: "Поиск по статусу",
    options: stateOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
