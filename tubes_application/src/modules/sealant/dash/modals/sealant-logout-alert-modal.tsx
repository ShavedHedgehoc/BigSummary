import { useShallow } from "zustand/react/shallow";
import { useSealantLogoutModalStore } from "../../store/use-sealant-modal-store";
import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { AppMessages } from "@/shared/resources/app-messages";

export default function SealantLogoutAlertModal() {
  const open = useSealantLogoutModalStore(useShallow((state) => state.open));
  const setOpen = useSealantLogoutModalStore(useShallow((state) => state.setOpen));
  const logout = useSealantEmployeeStore(useShallow((state) => state.clearSealantEmployee));

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
