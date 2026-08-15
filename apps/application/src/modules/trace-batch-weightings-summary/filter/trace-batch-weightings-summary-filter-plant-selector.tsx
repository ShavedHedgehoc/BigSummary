import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";
import PlantService from "../../../shared/api/services/plant-service";
import { useTraceBatchWeightingsSummaryFilterStore } from "../store/use-trace-batch-weightings-summary-filter-store";

import FilterStringValueSelector, {
  FilterStringValueSelectorOption,
  FilterStringValueSelectorProps,
} from "../../../shared/ui/filter-string-value-selector";
import { TraceBatchWeightingsSummaryFilterParams } from "./trace-batch-weightings-summary-filter-params";

export default function TraceBatchWeightingsSummaryFilterPlantSelector() {
  const changeFilter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useTraceBatchWeightingsSummaryFilterStore(
    useShallow((state) => state.plantSelectorOptions)
  );
  const fillPlantSelectorOptions = useTraceBatchWeightingsSummaryFilterStore(
    useShallow((state) => state.fillPlantSelectorOptions)
  );

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
    id: TraceBatchWeightingsSummaryFilterParams.PLANTS,
    selectedOption: selectedPlant,
    placeholder: "Выберите площадку",
    label: "Выбор площадки",
    options: plantOptions,
    maxW: 150,
    setSelectedOption: (id: string) => setSelectedPlant(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: string[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterStringValueSelector {...plantSelectorProps} />;
}
