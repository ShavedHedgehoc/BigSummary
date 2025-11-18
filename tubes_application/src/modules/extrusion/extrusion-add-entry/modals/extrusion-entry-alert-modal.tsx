import { useShallow } from "zustand/react/shallow";
import { useExtrusionEntryAlertModalStore } from "../../store/use-extrusion-entry-alert-modal-store";
import { useExtrusionInputCurrentParametersStore } from "../../store/use-extrusion-input-current-parameters-store";
import { useCreateExtrusionEntry } from "../../use-create-extrusion-entry";
import { useNavigate } from "react-router-dom";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import { RouteNames } from "@/shared/router/route-names";
import type { AlertModalProps } from "../../../common/alert-modal";
import AlertModal from "../../../common/alert-modal";
import { AppMessages } from "@/shared/resources/app-messages";

export default function ExtrusionEntryAlertModal() {
  const open = useExtrusionEntryAlertModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionEntryAlertModalStore(useShallow((state) => state.setOpen));
  const dto = useExtrusionEntryAlertModalStore((state) => state.dto);
  const clearDto = useExtrusionEntryAlertModalStore((state) => state.clearDto);
  const initData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.initData));
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const { createExtrusionEntry } = useCreateExtrusionEntry();
  const navigate = useNavigate();

  const handleOkClick = () => {
    if (dto) createExtrusionEntry(dto);
    navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
    initData();
    clearDto();
  };

  const alertModalProps: AlertModalProps = {
    title: "Вы уверены?!",
    message: AppMessages.PARAMETERS_OUT_TRESHOLDS,
    actionButtonValue: "Я уверен!",
    cancelButtonValue: "Назад",
    open: open,
    setOpen: (val: boolean) => setOpen(val),
    okAction: () => handleOkClick(),
  };

  return <AlertModal {...alertModalProps} />;
}
