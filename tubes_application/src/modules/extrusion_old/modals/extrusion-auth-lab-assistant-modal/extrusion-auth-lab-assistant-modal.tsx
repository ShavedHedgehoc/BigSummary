import { useShallow } from "zustand/react/shallow";
import type { ScanModalProps } from "../../../../shared/components/modals/scan-modal";
import ScanModal from "../../../../shared/components/modals/scan-modal";
import { useExtrusionAuthLabModalStore } from "../../store/use-extrusion-auth-lab-modal-store";
import { useExtrusionLabAssistantLogin } from "../../hooks/use-extrusion-lab-assistant-login";

export default function ExtrusionAutLabAssistanthModal() {
  const open = useExtrusionAuthLabModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionAuthLabModalStore(useShallow((state) => state.setOpen));
  const { login } = useExtrusionLabAssistantLogin();

  const modalProps: ScanModalProps = {
    title: "Отсканируйте бейдж",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => login(val),
  };

  return <ScanModal {...modalProps} />;
}
