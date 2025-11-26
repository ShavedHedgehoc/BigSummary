import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";
import { AppMessages } from "@/shared/resources/app-messages";
import useExtrusionCloseSummaryAlertModal from "./use-extrusion-close-summary-alert-modal";

export default function ExtrusionCloseSummaryAlertModal() {
  const { open, setOpen, handleOkClick } = useExtrusionCloseSummaryAlertModal();
  const alertModalProps: AlertModalProps = {
    title: "Закончить работу поста",
    message: AppMessages.WANT_TO_CLOSE_PROMPT,
    actionButtonValue: "Закончить",
    cancelButtonValue: "Отмена",
    open: open,
    setOpen: (val: boolean) => setOpen(val),
    okAction: () => handleOkClick(),
  };

  return <AlertModal {...alertModalProps} />;
}
