import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import type { AlertModalProps } from "../../../../shared/components/modals/alert-modal";
import AlertModal from "../../../../shared/components/modals/alert-modal";
import { AppMessages } from "@/shared/resources/app-messages";
import { useVarnishEntryAlertModalStore } from "../../store/use-varnish-entry-alert-modal-store";
import { useVarnishInputStore } from "../../store/use-varnish-input-store";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import { useCreateVarnishEntry } from "../../use-create-varnish-entry";

export default function VarnishEntryAlertModal() {
  const open = useVarnishEntryAlertModalStore(useShallow((state) => state.open));
  const setOpen = useVarnishEntryAlertModalStore(useShallow((state) => state.setOpen));
  const dto = useVarnishEntryAlertModalStore((state) => state.dto);
  const clearDto = useVarnishEntryAlertModalStore((state) => state.clearDto);
  const initData = useVarnishInputStore(useShallow((state) => state.initData));
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const { createVarnishEntry } = useCreateVarnishEntry();
  const navigate = useNavigate();

  const handleOkClick = () => {
    if (dto) createVarnishEntry(dto);
    navigate(`${RouteNames.VARNISH_ROOT}/${varnishConveyor?.name}`);
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
