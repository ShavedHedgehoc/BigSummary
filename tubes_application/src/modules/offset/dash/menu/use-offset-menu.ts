import { useShallow } from "zustand/react/shallow";

import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";
import {
  useOffsetAuthModalStore,
  useOffsetMaterialScanModalStore,
  useOffsetLogoutModalStore,
} from "../../store/use-offset-modal-store";

export default function useOffsetMenu() {
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const setOpenAuth = useOffsetAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useOffsetMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useOffsetLogoutModalStore(useShallow((state) => state.setOpen));

  return { employee, offsetConveyor, setOpenAuth, setOpenMaterialScan, setOpenLogout };
}
