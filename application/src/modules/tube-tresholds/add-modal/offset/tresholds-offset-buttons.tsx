import { useShallow } from "zustand/react/shallow";

import TresholdsButtons from "../shared/tresholds-buttons";
import { useTubeOffsetTresholdsStore } from "../store/use-tube-offset-tresholds-store";
import { useTubeTresholdsExtrusionFormModalStore } from "../../store/use-form-modals-store";

export default function TresholdsOffsetButtons() {
  const setOpen = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.setOpen));
  const clearTresholds = useTubeOffsetTresholdsStore(useShallow((state) => state.clearTresholds));
  return <TresholdsButtons setOpen={setOpen} clearData={clearTresholds} />;
}
