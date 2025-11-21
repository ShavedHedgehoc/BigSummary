import { useShallow } from "zustand/react/shallow";
import type { ScanModalProps } from "@/shared/components/modals/scan-modal";
import ScanModal from "@/shared/components/modals/scan-modal";
import { useEmployeeLogin } from "@/shared/api/use-employee-login";
import { useOffsetAuthModalStore } from "../../store/use-offset-modal-store";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";

export default function OffsetAuthModal() {
  const open = useOffsetAuthModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetAuthModalStore(useShallow((state) => state.setOpen));
  const setEmployee = useOffsetEmployeeStore(useShallow((state) => state.setOffsetEmployee));
  const { login } = useEmployeeLogin(setEmployee);

  const modalProps: ScanModalProps = {
    title: "Отсканируйте бейдж",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => login(val),
  };
  return <ScanModal {...modalProps} />;
}
