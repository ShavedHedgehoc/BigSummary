import { useShallow } from "zustand/react/shallow";
import { useVarnishAuthModalStore } from "../../store/use-varnish-modal-store";
import type { ScanModalProps } from "@/shared/components/modals/scan-modal";
import ScanModal from "@/shared/components/modals/scan-modal";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import { useEmployeeLogin } from "@/shared/api/use-employee-login";

export default function VarnishAuthModal() {
  const open = useVarnishAuthModalStore(useShallow((state) => state.open));
  const setOpen = useVarnishAuthModalStore(useShallow((state) => state.setOpen));
  const setEmployee = useVarnishEmployeeStore(useShallow((state) => state.setVarnishEmployee));
  const { login } = useEmployeeLogin(setEmployee);

  const modalProps: ScanModalProps = {
    title: "Отсканируйте бейдж",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => login(val),
  };
  return <ScanModal {...modalProps} />;
}
