import { useShallow } from "zustand/react/shallow";

import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { TimeReportFilterParams } from "./time-report-filter-params";

export default function TimeReportFilterPlantSelector() {
  const changeFilter = useTimeReportFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useTimeReportFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useTimeReportFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useTimeReportFilterStore(useShallow((state) => state.plantSelectorOptions));

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: TimeReportFilterParams.PLANT,
    selectedOption: selectedPlant,
    placeholder: "Выберите площадку",
    label: "Выбор площадки",
    options: plantOptions,
    setSelectedOption: (id: number) => setSelectedPlant(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...plantSelectorProps} />;
}
