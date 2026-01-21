import { useShallow } from "zustand/react/shallow";
import { useTubeExtrusionTresholdsStore } from "../store/use-tube-extrusion-tresholds-store";

export function useExtrusionTresholds() {
  const tresholds = useTubeExtrusionTresholdsStore(useShallow((state) => state.tresholds));
  const changeTresholds = useTubeExtrusionTresholdsStore(useShallow((state) => state.changeTresholds));
  const clearTresholds = useTubeExtrusionTresholdsStore(useShallow((state) => state.clearTresholds));
  const productSelectorOptions = useTubeExtrusionTresholdsStore(useShallow((state) => state.productSelectorOptions));
  const selectedProductOption = useTubeExtrusionTresholdsStore(useShallow((state) => state.selectedProductOption));
  const setSelectedProductOption = useTubeExtrusionTresholdsStore(
    useShallow((state) => state.setSelectedProductOption)
  );

  const conveyorSelectorOptions = useTubeExtrusionTresholdsStore(useShallow((state) => state.conveyorSelectorOptions));
  const selectedConveyorOption = useTubeExtrusionTresholdsStore(useShallow((state) => state.selectedConveyorOption));
  const setSelectedConveyorOption = useTubeExtrusionTresholdsStore(
    useShallow((state) => state.setSelectedConveyorOption)
  );
  const rondelSelectorOptions = useTubeExtrusionTresholdsStore(useShallow((state) => state.rondelSelectorOptions));
  const selectedRondelOption = useTubeExtrusionTresholdsStore(useShallow((state) => state.selectedRondelOption));
  const setSelectedRondelOption = useTubeExtrusionTresholdsStore(useShallow((state) => state.setSelectedRondelOption));

  return {
    tresholds,
    changeTresholds,
    clearTresholds,
    productSelectorOptions,
    selectedProductOption,
    setSelectedProductOption,
    conveyorSelectorOptions,
    selectedConveyorOption,
    setSelectedConveyorOption,
    rondelSelectorOptions,
    selectedRondelOption,
    setSelectedRondelOption,
  };
}
