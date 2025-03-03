import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";
import { useCansListFilterStore } from "./store/use-cans-list-filter-store";
import TracePlantsService from "../../shared/api/services/trace-plants-service";
import { CansListFilterParams } from "./cans-list-filter-params";

export default function CansListFilterPlantSelector() {
  const changeFilter = useCansListFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useCansListFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useCansListFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useCansListFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useCansListFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "cans_list"],
    queryFn: async () => {
      const data = await TracePlantsService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        return data;
      }
    },
  });

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.PlantPK}`} id={plant.PlantPK} value={plant.PlantName} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: CansListFilterParams.PLANTS,
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
