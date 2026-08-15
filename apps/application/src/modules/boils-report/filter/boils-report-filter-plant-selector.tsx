import { useShallow } from "zustand/react/shallow";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { useBoilsReportFilterStore } from "../store/use-boils-report-filter-store";
import { BoilsReportFilterParams } from "./boils-report-filter-params";

export default function BoilsReportFilterPlantSelector() {
  const changeFilter = useBoilsReportFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useBoilsReportFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useBoilsReportFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useBoilsReportFilterStore(useShallow((state) => state.plantSelectorOptions));

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: BoilsReportFilterParams.PLANTS,
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
