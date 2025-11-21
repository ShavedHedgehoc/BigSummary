import { useShallow } from "zustand/react/shallow";

import { useOffsetInputStore } from "../../store/use-offset-input-store";
import { useCreateOffsetEntry } from "../../use-create-offset-entry";
import { useNavigate } from "react-router-dom";
import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";
import { RouteNames } from "@/shared/router/route-names";
import type { AlertModalProps } from "../../../../shared/components/modals/alert-modal";
import AlertModal from "../../../../shared/components/modals/alert-modal";
import { AppMessages } from "@/shared/resources/app-messages";
import { useEOffsetEntryAlertModalStore } from "../../store/use-offset-entry-alert-modal-store";

export default function OffsetEntryAlertModal() {
  const open = useEOffsetEntryAlertModalStore(useShallow((state) => state.open));
  const setOpen = useEOffsetEntryAlertModalStore(useShallow((state) => state.setOpen));
  const dto = useEOffsetEntryAlertModalStore((state) => state.dto);
  const clearDto = useEOffsetEntryAlertModalStore((state) => state.clearDto);
  const initData = useOffsetInputStore(useShallow((state) => state.initData));
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const { createOffsetEntry } = useCreateOffsetEntry();
  const navigate = useNavigate();

  const handleOkClick = () => {
    if (dto) createOffsetEntry(dto);
    navigate(`${RouteNames.OFFSET_ROOT}/${offsetConveyor?.name}`);
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
