import { useShallow } from "zustand/shallow";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";
import { BoilsFilterParams } from "./boils-filter-params";

import { useQuery } from "@tanstack/react-query";
import PlantService from "../../services/PlantService";

import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";

export default function BoilsFilterPlantSelector() {
  const changeFilter = useBoilsFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useBoilsFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useBoilsFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useBoilsFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useBoilsFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "boils"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        setSelectedPlant(data[1].id);
        changeFilter({ key: BoilsFilterParams.PLANTS, value: "", values: [data[1].id] });
        return data;
      }
    },
  });

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
