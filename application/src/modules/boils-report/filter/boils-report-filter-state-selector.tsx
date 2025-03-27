import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "../../../shared/api/services/history-types-service";
import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../../shared/ui/filter-multi-selector";
import { useBoilsReportFilterStore } from "../store/use-boils-report-filter-store";
import { BoilsReportFilterParams } from "./boils-report-filter-params";

export default function BoilsReportFilterStateSelector() {
  const filter = useBoilsReportFilterStore(useShallow((state) => state.filter));
  const changeFilter = useBoilsReportFilterStore(useShallow((state) => state.changeFilter));
  const stateSelectorOptions = useBoilsReportFilterStore(useShallow((state) => state.stateSelectorOptions));
  const fillStateSelectorOptions = useBoilsReportFilterStore(useShallow((state) => state.fillStateSelectorOptions));

  useQuery({
    queryKey: ["boil_states_options"],
    queryFn: async () => {
      const data = await HistoryTypeService.getBoilsHistoryTypes();
      if (data) {
        fillStateSelectorOptions(data);
        // changeFilter({ key: BoilsReportFilterParams.STATES, value: "", values: [1] });
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
    id: BoilsReportFilterParams.STATES,
    selectedOptions: filter.states,
    placeholder: "Выберите статус",
    label: "Поиск по статусу",
    options: stateOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
