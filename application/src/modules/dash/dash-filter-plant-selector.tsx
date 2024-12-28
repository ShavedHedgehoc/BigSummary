import { useShallow } from "zustand/shallow";

import { useQuery } from "@tanstack/react-query";
import PlantService from "../../services/PlantService";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";
import { useDashFilterStore } from "./store/dash-filter-store";
import { DashFilterParams } from "./store/dash-filter-params";

export default function DashFilterPlantSelector() {
  const changeFilter = useDashFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useDashFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useDashFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useDashFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useDashFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "foreman"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        setSelectedPlant(data[1].id);
        changeFilter({ key: DashFilterParams.PLANT, value: "", values: [data[1].id] });
        return data;
      }
    },
  });

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
