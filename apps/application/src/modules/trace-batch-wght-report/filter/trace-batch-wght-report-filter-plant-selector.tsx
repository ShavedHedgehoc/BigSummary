import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";
import PlantService from "../../../shared/api/services/plant-service";

import FilterStringValueSelector, {
  FilterStringValueSelectorOption,
  FilterStringValueSelectorProps,
} from "../../../shared/ui/filter-string-value-selector";
import { useTraceBatchWghtReportFilterStore } from "../store/use-trace-batch-wght-report-filter-store";
import { TraceBatchWghtReportFilterParams } from "./trace-batch-wght-report-filter-params";

export default function TraceBatchWghtReportFilterPlantSelector() {
  const changeFilter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useTraceBatchWghtReportFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useTraceBatchWghtReportFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useTraceBatchWghtReportFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useTraceBatchWghtReportFilterStore(
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
    id: TraceBatchWghtReportFilterParams.PLANTS,
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
