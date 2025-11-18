import { useShallow } from "zustand/react/shallow";
import { useOffsetAuthModalStore } from "./store/use-offset-auth-modal-store";
import { useOffsetEmployeeLogin } from "./use-offset-employee-login";
import type { ScanModalProps } from "@/shared/components/modals/scan-modal";
import ScanModal from "@/shared/components/modals/scan-modal";

export default function OffsetAuthModal() {
  const open = useOffsetAuthModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetAuthModalStore(useShallow((state) => state.setOpen));
  const { login } = useOffsetEmployeeLogin();

  const modalProps: ScanModalProps = {
    title: "Отсканируйте бейдж",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => login(val),
  };
  return <ScanModal {...modalProps} />;
}
