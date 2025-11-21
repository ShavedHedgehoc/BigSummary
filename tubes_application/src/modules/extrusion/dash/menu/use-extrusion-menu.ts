import { useShallow } from "zustand/react/shallow";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import {
  useExtrusionAuthModalStore,
  useExtrusionMaterialScanModalStore,
  useExtrusionLogoutModalStore,
} from "../../store/use-extrusion-modal-store";

export default function useExtrusionMenu() {
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const setOpenAuth = useExtrusionAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useExtrusionMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useExtrusionLogoutModalStore(useShallow((state) => state.setOpen));

  return { employee, extrusionConveyor, setOpenAuth, setOpenLogout, setOpenMaterialScan };
}
