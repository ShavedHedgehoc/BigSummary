import { useShallow } from "zustand/react/shallow";
import { useTubeSealantTresholdsStore } from "../store/use-tube-sealant-tresholds-store";

export function useSealantTresholds() {
  const tresholds = useTubeSealantTresholdsStore(useShallow((state) => state.tresholds));
  const changeTresholds = useTubeSealantTresholdsStore(useShallow((state) => state.changeTresholds));
  const clearTresholds = useTubeSealantTresholdsStore(useShallow((state) => state.clearTresholds));
  const productSelectorOptions = useTubeSealantTresholdsStore(useShallow((state) => state.productSelectorOptions));
  const selectedProductOption = useTubeSealantTresholdsStore(useShallow((state) => state.selectedProductOption));
  const setSelectedProductOption = useTubeSealantTresholdsStore(useShallow((state) => state.setSelectedProductOption));
  const conveyorSelectorOptions = useTubeSealantTresholdsStore(useShallow((state) => state.conveyorSelectorOptions));
  const selectedConveyorOption = useTubeSealantTresholdsStore(useShallow((state) => state.selectedConveyorOption));
  const setSelectedConveyorOption = useTubeSealantTresholdsStore(
    useShallow((state) => state.setSelectedConveyorOption)
  );

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
