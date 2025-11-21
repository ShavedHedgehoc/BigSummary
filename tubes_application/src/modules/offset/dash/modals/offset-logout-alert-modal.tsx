import { useShallow } from "zustand/react/shallow";

import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";

import { AppMessages } from "@/shared/resources/app-messages";
import { useOffsetLogoutModalStore } from "../../store/use-offset-modal-store";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";

export default function OffsetLogoutAlertModal() {
  const open = useOffsetLogoutModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetLogoutModalStore(useShallow((state) => state.setOpen));
  const logout = useOffsetEmployeeStore(useShallow((state) => state.clearOffsetEmployee));

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
