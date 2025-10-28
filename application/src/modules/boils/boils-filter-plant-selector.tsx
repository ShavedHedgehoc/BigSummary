import { useShallow } from "zustand/shallow";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";
import { BoilsFilterParams } from "./boils-filter-params";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";

export default function BoilsFilterPlantSelector() {
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useBoilsFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useBoilsFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useBoilsFilterStore(useShallow((state) => state.plantSelectorOptions));
  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: BoilsFilterParams.PLANTS,
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
