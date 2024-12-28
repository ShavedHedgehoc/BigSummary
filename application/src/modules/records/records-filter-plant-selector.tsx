import { useShallow } from "zustand/shallow";

import { useQuery } from "@tanstack/react-query";
import PlantService from "../../services/PlantService";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";
import { RecordsFilterParams } from "./records-filter-params";
import { useRecordsFilterStore } from "./store/use-record-filter-store";

export default function RecordsFilterPlantSelector() {
  const changeFilter = useRecordsFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useRecordsFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useRecordsFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useRecordsFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useRecordsFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "foreman"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        setSelectedPlant(data[1].id);
        changeFilter({ key: RecordsFilterParams.PLANT, value: "", values: [data[1].id] });
        return data;
      }
    },
  });
  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: RecordsFilterParams.PLANT,
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
