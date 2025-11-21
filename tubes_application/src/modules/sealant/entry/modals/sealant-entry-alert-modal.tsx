import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import type { AlertModalProps } from "../../../../shared/components/modals/alert-modal";
import AlertModal from "../../../../shared/components/modals/alert-modal";
import { AppMessages } from "@/shared/resources/app-messages";
import { useSealantEntryAlertModalStore } from "../../store/use-sealant-entry-alert-modal-store";
import { useSealantInputStore } from "../../store/use-sealant-input-store";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useCreateSealantEntry } from "../../use-create-sealant-entry";

export default function SealantEntryAlertModal() {
  const open = useSealantEntryAlertModalStore(useShallow((state) => state.open));
  const setOpen = useSealantEntryAlertModalStore(useShallow((state) => state.setOpen));
  const dto = useSealantEntryAlertModalStore((state) => state.dto);
  const clearDto = useSealantEntryAlertModalStore((state) => state.clearDto);
  const initData = useSealantInputStore(useShallow((state) => state.initData));
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const { createSealantEntry } = useCreateSealantEntry();
  const navigate = useNavigate();

  const handleOkClick = () => {
    if (dto) createSealantEntry(dto);
    navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
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
