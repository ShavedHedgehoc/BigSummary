import { useShallow } from "zustand/react/shallow";
import { useTubeTresholdsExtrusionFormModalStore } from "../../store/use-form-modals-store";
import { useTubeExtrusionTresholdsStore } from "../store/use-tube-extrusion-tresholds-store";
import TresholdsButtons from "../shared/tresholds-buttons";

export default function TresholdsExtrusionButtons() {
  const setOpen = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.setOpen));
  const clearTresholds = useTubeExtrusionTresholdsStore(useShallow((state) => state.clearTresholds));
  return <TresholdsButtons setOpen={setOpen} clearData={clearTresholds} />;
}
