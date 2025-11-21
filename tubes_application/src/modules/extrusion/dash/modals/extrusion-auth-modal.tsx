import { useShallow } from "zustand/react/shallow";
import { useExtrusionAuthModalStore } from "../../store/use-extrusion-modal-store";
// import { useExtrusionEmployeeLogin } from "../../use-extrusion-employee-login";
import type { ScanModalProps } from "@/shared/components/modals/scan-modal";
import ScanModal from "@/shared/components/modals/scan-modal";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useEmployeeLogin } from "@/shared/api/use-employee-login";

export default function ExtrusionAuthModal() {
  const open = useExtrusionAuthModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionAuthModalStore(useShallow((state) => state.setOpen));
  const setEmployee = useExtrusionEmployeeStore(useShallow((state) => state.setExtrusionEmployee));
  const { login } = useEmployeeLogin(setEmployee);

  const modalProps: ScanModalProps = {
    title: "Отсканируйте бейдж",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => login(val),
  };
  return <ScanModal {...modalProps} />;
}
