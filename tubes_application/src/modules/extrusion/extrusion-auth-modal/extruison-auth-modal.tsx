import { useExtrusionAuthModalStore } from "../store/use-extrusion-auth-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useLogin } from "../use-extrusion-login";
import type { ScanModalProps } from "../../../shared/components/scan-modal";
import ScanModal from "../../../shared/components/scan-modal";

export default function ExtrusionAuthModalNew() {
  const open = useExtrusionAuthModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionAuthModalStore(useShallow((state) => state.setOpen));
  const { login } = useLogin();

  const modalProps: ScanModalProps = {
    title: "Отсканируйте бейдж",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => login(val),
  };

  return <ScanModal {...modalProps} />;
}
