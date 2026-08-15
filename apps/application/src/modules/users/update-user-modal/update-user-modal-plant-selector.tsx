import { useShallow } from "zustand/react/shallow";
import ModalSelector, { ModalSelectorOption, ModalSelectorProps } from "../../../shared/ui/modal-selector";
import { useUserUpdateModalStore } from "../store/use-update-user-modal-store";

export default function UpdateUserModalPlantSelector() {
  const selectedPlant = useUserUpdateModalStore(useShallow((state) => state.selectedPlant));
  const plantSelectorOptions = useUserUpdateModalStore(useShallow((state) => state.plantSelectorOptions));
  const setSelectedPlant = useUserUpdateModalStore(useShallow((state) => state.setSelectedPlant));
  const setPlants = useUserUpdateModalStore(useShallow((state) => state.setPlants));

  const plantOptions = plantSelectorOptions.map((plant) => (
    <ModalSelectorOption key={`plant_option_${plant.id}`} id={plant.id} value={plant.value} />
  ));

  const plantSelectorProps: ModalSelectorProps = {
    id: "update-user-modal-plant-selector",
    selectedOption: selectedPlant,
    placeholder: "Выберите площадку",
    fullWidth: true,
    options: plantOptions,
    setSelectedOption: (id: number) => setSelectedPlant(id),
    onChange: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      setPlants({
        key,
        value,
        values,
      }),
  };

  return <ModalSelector {...plantSelectorProps} />;
}
