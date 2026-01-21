import { useShallow } from "zustand/react/shallow";
import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";
import {
  useOffsetAuthModalStore,
  useOffsetMaterialScanModalStore,
  useOffsetLogoutModalStore,
  useOffsetCloseSummaryModalStore,
} from "../../store/use-offset-modal-store";
import { useActiveSummary } from "@/shared/api/use-active-summary";

export default function useOffsetMenu() {
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const { data: summaryData } = useActiveSummary(offsetConveyor?.id ?? null);
  const setOpenAuth = useOffsetAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useOffsetMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useOffsetLogoutModalStore(useShallow((state) => state.setOpen));
  const setOpenCloseSummary = useOffsetCloseSummaryModalStore(useShallow((state) => state.setOpen));

  const inputParametersButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.offsetStatus.idle ||
    !summaryData.offset_materials.length ||
    summaryData.offsetStatus.finished ||
    !summaryData.offsetTresholds ||
    summaryData.offset_materials.map((item) => item.scanned).includes(false);

  const scanMaterialsButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.offsetStatus.finished ||
    summaryData.offsetStatus.idle ||
    !summaryData.offsetTresholds;

  const operationButtonDisabledCondition =
    !employee || !summaryData || !summaryData.offsetStatus.createdAt || summaryData.offsetStatus.finished;

  const pictureButtonDisabledCondition = summaryData === null;

  const endButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.offsetStatus.createdAt ||
    summaryData.offsetStatus.idle ||
    summaryData.offsetStatus.finished;

  return {
    employee,
    offsetConveyor,
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
