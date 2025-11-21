import { useShallow } from "zustand/react/shallow";
import { useExtrusionLogoutModalStore } from "../../store/use-extrusion-modal-store";
import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { AppMessages } from "@/shared/resources/app-messages";

export default function ExtrusionLogoutAlertModal() {
  const open = useExtrusionLogoutModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionLogoutModalStore(useShallow((state) => state.setOpen));
  const logout = useExtrusionEmployeeStore(useShallow((state) => state.clearExtrusionEmployee));

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
