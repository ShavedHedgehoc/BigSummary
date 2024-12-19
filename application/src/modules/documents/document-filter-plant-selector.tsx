import { useShallow } from "zustand/shallow";
import { useDocumentsFilterStore } from "./store/use-documents-filter-store";
import { DocumentsFilterParams } from "./documents-filter-params";

import { useQuery } from "@tanstack/react-query";
import PlantService from "../../services/PlantService";

import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";

export default function DocumentsFilterPlantSelector() {
  const changeFilter = useDocumentsFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useDocumentsFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useDocumentsFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useDocumentsFilterStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useDocumentsFilterStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "documents"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        // setSelectedPlant(data[1].id);
        // changeFilter({ key: DocumentsFilterParams.PLANTS, value: "", values: [data[1].id] });
        return data;
      }
    },
  });

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FilterSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FilterSelectorProps = {
    id: DocumentsFilterParams.PLANTS,
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
