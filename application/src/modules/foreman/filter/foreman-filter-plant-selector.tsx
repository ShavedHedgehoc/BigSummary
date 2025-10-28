import { useShallow } from "zustand/shallow";
import { useForemanFilterStore } from "../store/use-foreman-filter-store";
import { ForemanFilterParams } from "./foreman-filter-params";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";

export default function ForemanFilterPlantSelector() {
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useForemanFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useForemanFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useForemanFilterStore(useShallow((state) => state.plantSelectorOptions));

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: ForemanFilterParams.PLANT,
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
