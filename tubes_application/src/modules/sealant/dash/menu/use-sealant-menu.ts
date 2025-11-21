import { useShallow } from "zustand/react/shallow";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import {
  useSealantAuthModalStore,
  useSealantMaterialScanModalStore,
  useSealantLogoutModalStore,
} from "../../store/use-sealant-modal-store";

export default function useSealantMenu() {
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const setOpenAuth = useSealantAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useSealantMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useSealantLogoutModalStore(useShallow((state) => state.setOpen));

  return { employee, sealantConveyor, setOpenAuth, setOpenLogout, setOpenMaterialScan };
}
