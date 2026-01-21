import { useShallow } from "zustand/react/shallow";
import {
  CreateExtrusionTresholdDto,
  CreateOffsetTresholdDto,
  CreateSealantTresholdDto,
  CreateVarnishTresholdDto,
} from "../../../shared/api/services/tube-tresholds-service";
import { useTubeExtrusionTresholdsStore } from "./store/use-tube-extrusion-tresholds-store";
import { useTubeCreateExtrusionTreshold } from "./extrusion/use-tube-create-extrusion-treshold";
import { useTubeTresholdsExtrusionFormModalStore } from "../store/use-form-modals-store";
import { useTubeCreateVarnishTreshold } from "./varnish/use-tube-create-varnish-treshold";
import { useTubeVarnishTresholdsStore } from "./store/use-tube-varnish-tresholds-store";
import { useTubeOffsetTresholdsStore } from "./store/use-tube-offset-tresholds-store";
import { useTubeCreateOffsetTreshold } from "./offset/use-tube-create-offset-treshold";
import { useTubeSealantTresholdsStore } from "./store/use-tube-sealant-tresholds-store";
import { useTubeCreateSealantTreshold } from "./sealant/use-tube-create-sealant-treshold";

export default function useTresholdsAddModalHandleSubmit() {
  const setOpen = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.setOpen));
  const extrusionTresholds = useTubeExtrusionTresholdsStore(useShallow((state) => state.tresholds));
  const clearExtrusionTresholds = useTubeExtrusionTresholdsStore(useShallow((state) => state.clearTresholds));
  const varnishTresholds = useTubeVarnishTresholdsStore(useShallow((state) => state.tresholds));
  const clearVarnishTresholds = useTubeVarnishTresholdsStore(useShallow((state) => state.clearTresholds));
  const offsetTresholds = useTubeOffsetTresholdsStore(useShallow((state) => state.tresholds));
  const clearOffsetTresholds = useTubeOffsetTresholdsStore(useShallow((state) => state.clearTresholds));
  const sealantTresholds = useTubeSealantTresholdsStore(useShallow((state) => state.tresholds));
  const clearSealantTresholds = useTubeSealantTresholdsStore(useShallow((state) => state.clearTresholds));

  const { createExtrusionTreshold } = useTubeCreateExtrusionTreshold();
  const { createVarnishTreshold } = useTubeCreateVarnishTreshold();
  const { createOffsetTreshold } = useTubeCreateOffsetTreshold();
  const { createSealantTreshold } = useTubeCreateSealantTreshold();

  const handleExtrusionSubmit = () => {
    const dto: CreateExtrusionTresholdDto = { ...extrusionTresholds };
    createExtrusionTreshold(dto);
    setOpen(false);
    clearExtrusionTresholds();
  };

  const handleVarnishSubmit = () => {
    const dto: CreateVarnishTresholdDto = { ...varnishTresholds };
    createVarnishTreshold(dto);
    setOpen(false);
    clearVarnishTresholds();
  };

  const handleOffsetSubmit = () => {
    const dto: CreateOffsetTresholdDto = { ...offsetTresholds };
    createOffsetTreshold(dto);
    setOpen(false);
    clearOffsetTresholds();
  };

  const handleSealantSubmit = () => {
    const dto: CreateSealantTresholdDto = { ...sealantTresholds };
    createSealantTreshold(dto);
    setOpen(false);
    clearSealantTresholds();
  };

  const handleExtrusionClose = () => {
    setOpen(false);
    clearExtrusionTresholds();
  };
  const handleVarnishClose = () => {
    setOpen(false);
    clearVarnishTresholds();
  };
  const handleOffsetClose = () => {
    setOpen(false);
    clearOffsetTresholds();
  };
  const handleSealantClose = () => {
    setOpen(false);
    clearSealantTresholds();
  };

  return {
    handleExtrusionSubmit,
    handleVarnishSubmit,
    handleOffsetSubmit,
    handleSealantSubmit,
    handleExtrusionClose,
    handleVarnishClose,
    handleOffsetClose,
    handleSealantClose,
  };
}
