import { useShallow } from "zustand/react/shallow";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import {
  useExtrusionAuthModalStore,
  useExtrusionMaterialScanModalStore,
  useExtrusionLogoutModalStore,
  // useExtrusionAlertCloseSummaryModalStore,
  useExtrusionCloseSummaryModalStore,
} from "../../store/use-extrusion-modal-store";
import { useActiveSummary } from "@/shared/api/use-active-summary";

export default function useExtrusionMenu() {
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const { data: summaryData } = useActiveSummary(extrusionConveyor?.id ?? null);
  const setOpenAuth = useExtrusionAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useExtrusionMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useExtrusionLogoutModalStore(useShallow((state) => state.setOpen));
  // const setOpenCloseSummary = useExtrusionAlertCloseSummaryModalStore(useShallow((state) => state.setOpen));
  const setOpenCloseSummary = useExtrusionCloseSummaryModalStore(useShallow((state) => state.setOpen));

  const inputParametersButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.extrusionStatus.idle ||
    !summaryData.extrusion_materials.length ||
    summaryData.extrusionStatus.finished ||
    !summaryData.extrusionTresholds ||
    summaryData.extrusion_materials.map((item) => item.scanned).includes(false);

  const scanMaterialsButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.extrusionStatus.finished ||
    summaryData.extrusionStatus.idle ||
    !summaryData.extrusionTresholds;

  const operationButtonDisabledCondition =
    !employee || !summaryData || !summaryData.extrusionStatus.createdAt || summaryData.extrusionStatus.finished;

  const pictureButtonDisabledCondition = summaryData === null;

  const endButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.extrusionStatus.createdAt ||
    summaryData.extrusionStatus.idle ||
    summaryData.extrusionStatus.finished;

  return {
    employee,
    extrusionConveyor,
    setOpenAuth,
    setOpenLogout,
    setOpenMaterialScan,
    setOpenCloseSummary,
    inputParametersButtonDisabledCondition,
    scanMaterialsButtonDisabledCondition,
    operationButtonDisabledCondition,
    pictureButtonDisabledCondition,
    endButtonDisabledCondition,
  };
}
