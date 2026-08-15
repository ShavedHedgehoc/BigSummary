import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";

import { useCansFilterStore } from "./store/use-cans-filter-store";
import { CansFilterParams } from "./cans-filter-params";
import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../../shared/ui/filter-multi-selector";
import TraceCanStatesService from "../../../shared/api/services/trace-can-states-service";

export default function CansFilterStateSelector() {
  const filter = useCansFilterStore(useShallow((state) => state.filter));
  const changeFilter = useCansFilterStore(useShallow((state) => state.changeFilter));
  const stateSelectorOptions = useCansFilterStore(useShallow((state) => state.stateSelectorOptions));
  const fillStateSelectorOptions = useCansFilterStore(useShallow((state) => state.fillStateSelectorOptions));

  useQuery({
    queryKey: ["cans_states_options"],
    queryFn: async () => {
      const data = await TraceCanStatesService.getCanStates();
      if (data) {
        fillStateSelectorOptions(data);
        // changeFilter({ key: CansFilterParams.STATES, value: "", values: [1] });
        return data;
      }
    },
  });

  const stateOptions = stateSelectorOptions.map((state) => (
    <FilterMultiSelectorOption
      key={`state_option_${state.CanStatePK}`}
      id={state.CanStatePK}
      value={state.CanStateDescription}
      options={[...filter.states]}
    />
  ));

  const stateSelectorProps: FilterMultiSelectorProps = {
    id: CansFilterParams.STATES,
    selectedOptions: filter.states,
    placeholder: "Выберите статус",
    label: "Поиск по статусу",
    options: stateOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
