import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";
import PlantService from "../../shared/api/services/plant-service";

import { useDocsUploadFormStore } from "./store/use-docs-upload-form-store";
import { DocsUploadFormParams } from "./docs-upload-form-params";
import FormSelector, { FormSelectorOption, FormSelectorProps } from "../../shared/ui/form-selector";

export default function DocsUploadFormPlantSelector() {
  const changeFilter = useDocsUploadFormStore(useShallow((state) => state.changeFilter));
  const selectedPlant = useDocsUploadFormStore(useShallow((state) => state.selectedPlant));
  const setSelectedPlant = useDocsUploadFormStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useDocsUploadFormStore(useShallow((state) => state.plantSelectorOptions));
  const fillPlantSelectorOptions = useDocsUploadFormStore(useShallow((state) => state.fillPlantSelectorOptions));

  useQuery({
    queryKey: ["plants_options", "docs_upload"],
    queryFn: async () => {
      const data = await PlantService.getAllPlants();
      if (data) {
        fillPlantSelectorOptions(data);
        setSelectedPlant(data[1].id);
        changeFilter({ key: DocsUploadFormParams.PLANT, value: "", values: [data[1].id] });
        return data;
      }
    },
  });

  const plantOptions = plantSelectorOptions.map((plant) => (
    <FormSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: FormSelectorProps = {
    id: DocsUploadFormParams.PLANT,
    selectedOption: selectedPlant,
    placeholder: "Выберите площадку",
    label: "Выбор площадки",
    options: plantOptions,
    setSelectedOption: (id: number) => setSelectedPlant(id),
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FormSelector {...plantSelectorProps} />;
}
