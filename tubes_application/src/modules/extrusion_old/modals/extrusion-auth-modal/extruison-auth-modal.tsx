import { useExtrusionAuthModalStore } from "../../store/use-extrusion-auth-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useExtrusionEmployeeLogin } from "../../hooks/use-extrusion-employee-login";
import type { ScanModalProps } from "../../../../shared/components/modals/scan-modal";
import ScanModal from "../../../../shared/components/modals/scan-modal";

export default function ExtrusionAuthModal() {
  const open = useExtrusionAuthModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionAuthModalStore(useShallow((state) => state.setOpen));
  const { login } = useExtrusionEmployeeLogin();

  const modalProps: ScanModalProps = {
    title: "Отсканируйте бейдж",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => login(val),
  };

  return <ScanModal {...modalProps} />;
}
