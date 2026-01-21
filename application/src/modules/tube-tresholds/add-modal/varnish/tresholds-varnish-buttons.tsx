import { useShallow } from "zustand/react/shallow";
import { useTubeTresholdsExtrusionFormModalStore } from "../../store/use-form-modals-store";
import TresholdsButtons from "../shared/tresholds-buttons";
import { useTubeVarnishTresholdsStore } from "../store/use-tube-varnish-tresholds-store";

export default function TresholdsVarnishButtons() {
  const setOpen = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.setOpen));
  const clearTresholds = useTubeVarnishTresholdsStore(useShallow((state) => state.clearTresholds));
  return <TresholdsButtons setOpen={setOpen} clearData={clearTresholds} />;
}
