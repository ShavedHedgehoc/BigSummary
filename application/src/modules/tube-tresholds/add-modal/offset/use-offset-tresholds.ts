import { useShallow } from "zustand/react/shallow";
import { useTubeOffsetTresholdsStore } from "../store/use-tube-offset-tresholds-store";

export function useOffsetTresholds() {
  const tresholds = useTubeOffsetTresholdsStore(useShallow((state) => state.tresholds));
  const changeTresholds = useTubeOffsetTresholdsStore(useShallow((state) => state.changeTresholds));
  const clearTresholds = useTubeOffsetTresholdsStore(useShallow((state) => state.clearTresholds));
  const productSelectorOptions = useTubeOffsetTresholdsStore(useShallow((state) => state.productSelectorOptions));
  const selectedProductOption = useTubeOffsetTresholdsStore(useShallow((state) => state.selectedProductOption));
  const setSelectedProductOption = useTubeOffsetTresholdsStore(useShallow((state) => state.setSelectedProductOption));
  const conveyorSelectorOptions = useTubeOffsetTresholdsStore(useShallow((state) => state.conveyorSelectorOptions));
  const selectedConveyorOption = useTubeOffsetTresholdsStore(useShallow((state) => state.selectedConveyorOption));
  const setSelectedConveyorOption = useTubeOffsetTresholdsStore(useShallow((state) => state.setSelectedConveyorOption));

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
  };
}
