import { useShallow } from "zustand/react/shallow";
import { useTubeTresholdsExtrusionFormModalStore } from "../../store/use-form-modals-store";
import TresholdsButtons from "../shared/tresholds-buttons";
import { useTubeSealantTresholdsStore } from "../store/use-tube-sealant-tresholds-store";

export default function TresholdsSealantButtons() {
  const setOpen = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.setOpen));
  const clearTresholds = useTubeSealantTresholdsStore(useShallow((state) => state.clearTresholds));
  return <TresholdsButtons setOpen={setOpen} clearData={clearTresholds} />;
}
