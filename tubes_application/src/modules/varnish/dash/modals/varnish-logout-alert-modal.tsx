import { useShallow } from "zustand/react/shallow";
import { useVarnishLogoutModalStore } from "../../store/use-varnish-modal-store";
import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import { AppMessages } from "@/shared/resources/app-messages";

export default function VarnishLogoutAlertModal() {
  const open = useVarnishLogoutModalStore(useShallow((state) => state.open));
  const setOpen = useVarnishLogoutModalStore(useShallow((state) => state.setOpen));
  const logout = useVarnishEmployeeStore(useShallow((state) => state.clearVarnishEmployee));

  const alertModalProps: AlertModalProps = {
    title: "Выход пользователя",
    message: AppMessages.WANT_TO_QUIT_PROMPT,
    actionButtonValue: "Выйти",
    cancelButtonValue: "Остаться",
    open: open,
    setOpen: (val: boolean) => setOpen(val),
    okAction: () => logout(),
  };

  return <AlertModal {...alertModalProps} />;
}
