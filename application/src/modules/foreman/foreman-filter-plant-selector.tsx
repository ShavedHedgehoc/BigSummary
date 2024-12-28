import { useShallow } from "zustand/shallow";
import { useForemanFilterStore } from "./store/use-foreman-filter-store";
import { ForemanFilterParams } from "./foreman-filter-params";
import { useQuery } from "@tanstack/react-query";
import PlantService from "../../services/PlantService";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";

export default function ForemanFilterPlantSelector() {
  const changeFilter = useForemanFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useForemanFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useForemanFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useForemanFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useForemanFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "foreman"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        setSelectedPlant(data[1].id);
        changeFilter({ key: ForemanFilterParams.PLANT, value: "", values: [data[1].id] });
        return data;
      }
    },
  });

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
