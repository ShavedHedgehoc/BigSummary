import { useShallow } from "zustand/react/shallow";

import { useQuery } from "@tanstack/react-query";
import PlantService from "../../../shared/api/services/plant-service";

import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { useInventoriesFilterStore } from "../store/use-inventories-filter-store";
import { InventoriesFilterParams } from "./inventories-filter-params";

export default function InventoriesFilterPlantSelector() {
  const changeFilter = useInventoriesFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useInventoriesFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useInventoriesFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useInventoriesFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useInventoriesFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "documents"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        return data;
      }
    },
  });

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: InventoriesFilterParams.PLANTS,
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
