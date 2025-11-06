import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { useCansFilterStore } from "./store/use-cans-filter-store";
import { CansFilterParams } from "./cans-filter-params";
import TracePlantsService from "../../../shared/api/services/trace-plants-service";

export default function CansFilterPlantSelector() {
  const changeFilter = useCansFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useCansFilterStore(useShallow((state) => state.selectedPlant));
  const transit = useCansFilterStore(useShallow((state) => state.filter.transit));
  const setSelectedPlant = useCansFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useCansFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useCansFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["trace_plants_options", "cans"],
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
    id: CansFilterParams.PLANTS,
    selectedOption: selectedPlant,
    placeholder: "Выберите площадку",
    label: `${transit ? "Выбор площадки отправки" : "Выбор площадки"}`,
    options: plantOptions,
    setSelectedOption: (id: number) => setSelectedPlant(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterSelector {...plantSelectorProps} />;
}
