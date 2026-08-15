import { useShallow } from "zustand/react/shallow";
import { useDocumentsFilterStore } from "./store/use-documents-filter-store";
import { DocumentsFilterParams } from "./documents-filter-params";

import FilterSelector, { FilterSelectorOption, FilterSelectorProps } from "../../shared/ui/filter-selector";

export default function DocumentsFilterPlantSelector() {
  const changeFilter = useDocumentsFilterStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useDocumentsFilterStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useDocumentsFilterStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useDocumentsFilterStore(useShallow((state) => state.plantSelectorOptions));

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
