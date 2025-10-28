import { useShallow } from "zustand/shallow";
import { useDashFilterStore } from "./store/dash-filter-store";
import { DashFilterParams } from "./dash-filter-params";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";

export default function DashFilterPlantSelector() {
  const changeFilter = useDashFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useDashFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useDashFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useDashFilterStore(useShallow((state) => state.plantSelectorOptions));

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: DashFilterParams.PLANT,
    selectedOption: selectedPlant,
    placeholder: "Выберите площадку",
    label: "",
    options: plantOptions,
    setSelectedOption: (id: number) => setSelectedPlant(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...plantSelectorProps} />;
}
