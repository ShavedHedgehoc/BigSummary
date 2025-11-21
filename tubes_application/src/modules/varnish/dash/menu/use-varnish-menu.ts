import { useShallow } from "zustand/react/shallow";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import {
  useVarnishAuthModalStore,
  useVarnishMaterialScanModalStore,
  useVarnishLogoutModalStore,
} from "../../store/use-varnish-modal-store";

export default function useVarnishMenu() {
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const setOpenAuth = useVarnishAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useVarnishMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useVarnishLogoutModalStore(useShallow((state) => state.setOpen));

  return { employee, varnishConveyor, setOpenAuth, setOpenLogout, setOpenMaterialScan };
}
