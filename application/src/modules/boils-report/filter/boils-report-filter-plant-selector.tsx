import { useShallow } from "zustand/shallow";

import { useQuery } from "@tanstack/react-query";
import PlantService from "../../../shared/api/services/plant-service";

import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { useBoilsReportFilterStore } from "../store/use-boils-report-filter-store";
import { BoilsReportFilterParams } from "./boils-report-filter-params";

export default function BoilsReportFilterPlantSelector() {
  const changeFilter = useBoilsReportFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useBoilsReportFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useBoilsReportFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useBoilsReportFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useBoilsReportFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "boils"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        // setSelectedPlant(data[1].id);
        // changeFilter({ key: BoilsReportFilterParams.PLANTS, value: "", values: [data[1].id] });
        return data;
      }
    },
  });

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: BoilsReportFilterParams.PLANTS,
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
