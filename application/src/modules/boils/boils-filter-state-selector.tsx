import { useShallow } from "zustand/shallow";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";
import { BoilsFilterParams } from "./boils-filter-params";

import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "../../shared/api/services/history-types-service";

import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../shared/ui/filter-multi-selector";

export default function BoilsFilterStateSelector() {
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));
  const stateSelectorOptions = useBoilsFilterStore(useShallow((state) => state.stateSelectorOptions));
  const fillStateSelectorOptions = useBoilsFilterStore(useShallow((state) => state.fillStateSelectorOptions));

  useQuery({
    queryKey: ["boil_states_options"],
    queryFn: async () => {
      const data = await HistoryTypeService.getBoilsHistoryTypes();
      if (data) {
        fillStateSelectorOptions(data);
        changeFilter({ key: BoilsFilterParams.STATES, value: "", values: [1] });
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
    id: BoilsFilterParams.STATES,
    selectedOptions: filter.states,
    placeholder: "Выберите статус",
    label: "Поиск по статусу",
    options: stateOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
