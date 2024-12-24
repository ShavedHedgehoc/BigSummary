import { useShallow } from "zustand/shallow";
import { useRecordsFilterStore } from "./store/use-record-filter-store";
import { RecordsFilterParams } from "./records-filter-params";
import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "../../shared/api/services/history-types-service";

import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../shared/ui/filter-multi-selector";

export default function RecordsFilterStateSelector() {
  const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useRecordsFilterStore(useShallow((state) => state.changeFilter));
  const stateSelectorOptions = useRecordsFilterStore(useShallow((state) => state.stateSelectorOptions));
  const fillStateSelectorOptions = useRecordsFilterStore(useShallow((state) => state.fillStateSelectorOptions));

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
    id: RecordsFilterParams.STATES,
    selectedOptions: filter.states,
    placeholder: "Выберите статус",
    label: "Поиск по статусу",
    options: stateOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
