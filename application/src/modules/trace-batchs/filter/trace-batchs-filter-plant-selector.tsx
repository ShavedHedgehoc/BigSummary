import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import PlantService from "../../../shared/api/services/plant-service";
import { useTraceBatchsFilterStore } from "../store/use-trace-batchs-filter-store";
import { TraceBatchsFilterParams } from "./trace-batchs-filter-params";
import FilterStringValueSelector, {
  FilterStringValueSelectorOption,
  FilterStringValueSelectorProps,
} from "../../../shared/ui/filter-string-value-selector";

export default function TraceBatchsFilterPlantSelector() {
  const changeFilter = useTraceBatchsFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useTraceBatchsFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useTraceBatchsFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useTraceBatchsFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useTraceBatchsFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

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
    <FilterStringValueSelectorOption key={`plant_option_${plant.id}`} id={plant.abb[0]} value={plant.value} />
  ));

  const plantSelectorProps: FilterStringValueSelectorProps = {
    id: TraceBatchsFilterParams.PLANTS,
    selectedOption: selectedPlant,
    placeholder: "Выберите площадку",
    label: "Выбор площадки",
    options: plantOptions,
    maxW: 120,
    setSelectedOption: (id: string) => setSelectedPlant(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: string[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterStringValueSelector {...plantSelectorProps} />;
}
