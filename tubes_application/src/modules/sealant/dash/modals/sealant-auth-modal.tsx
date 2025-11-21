import { useShallow } from "zustand/react/shallow";
import { useSealantAuthModalStore } from "../../store/use-sealant-modal-store";
import type { ScanModalProps } from "@/shared/components/modals/scan-modal";
import ScanModal from "@/shared/components/modals/scan-modal";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { useEmployeeLogin } from "@/shared/api/use-employee-login";

export default function SealantAuthModal() {
  const open = useSealantAuthModalStore(useShallow((state) => state.open));
  const setOpen = useSealantAuthModalStore(useShallow((state) => state.setOpen));
  const setEmployee = useSealantEmployeeStore(useShallow((state) => state.setSealantEmployee));
  const { login } = useEmployeeLogin(setEmployee);

  const modalProps: ScanModalProps = {
    title: "Отсканируйте бейдж",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => login(val),
  };
  return <ScanModal {...modalProps} />;
}
