import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import PlantService from "../../../shared/api/services/plant-service";
import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../../shared/ui/filter-selector";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { TimeReportFilterParams } from "./time-report-filter-params";

export default function TimeReportFilterPlantSelector() {
  const changeFilter = useTimeReportFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useTimeReportFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useTimeReportFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useTimeReportFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useTimeReportFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "foreman"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        setSelectedPlant(data[1].id);
        changeFilter({ key: TimeReportFilterParams.PLANT, value: "", values: [data[1].id] });
        return data;
      }
    },
  });

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: TimeReportFilterParams.PLANT,
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
