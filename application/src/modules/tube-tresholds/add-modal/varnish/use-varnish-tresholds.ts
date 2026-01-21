import { useShallow } from "zustand/react/shallow";
import { useTubeVarnishTresholdsStore } from "../store/use-tube-varnish-tresholds-store";

export function useVarnishTresholds() {
  const tresholds = useTubeVarnishTresholdsStore(useShallow((state) => state.tresholds));
  const changeTresholds = useTubeVarnishTresholdsStore(useShallow((state) => state.changeTresholds));
  const clearTresholds = useTubeVarnishTresholdsStore(useShallow((state) => state.clearTresholds));
  const productSelectorOptions = useTubeVarnishTresholdsStore(useShallow((state) => state.productSelectorOptions));
  const selectedProductOption = useTubeVarnishTresholdsStore(useShallow((state) => state.selectedProductOption));
  const setSelectedProductOption = useTubeVarnishTresholdsStore(useShallow((state) => state.setSelectedProductOption));
  const conveyorSelectorOptions = useTubeVarnishTresholdsStore(useShallow((state) => state.conveyorSelectorOptions));
  const selectedConveyorOption = useTubeVarnishTresholdsStore(useShallow((state) => state.selectedConveyorOption));
  const setSelectedConveyorOption = useTubeVarnishTresholdsStore(
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
