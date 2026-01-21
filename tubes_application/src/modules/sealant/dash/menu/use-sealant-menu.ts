import { useShallow } from "zustand/react/shallow";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import {
  useSealantAuthModalStore,
  useSealantMaterialScanModalStore,
  useSealantLogoutModalStore,
  useSealantCloseSummaryModalStore,
} from "../../store/use-sealant-modal-store";
import { useActiveSummary } from "@/shared/api/use-active-summary";

export default function useSealantMenu() {
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const { data: summaryData } = useActiveSummary(sealantConveyor?.id ?? null);
  const setOpenAuth = useSealantAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useSealantMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useSealantLogoutModalStore(useShallow((state) => state.setOpen));
  const setOpenCloseSummary = useSealantCloseSummaryModalStore(useShallow((state) => state.setOpen));

  const inputParametersButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.sealantStatus.idle ||
    !summaryData.sealant_materials.length ||
    summaryData.sealantStatus.finished ||
    !summaryData.sealantTresholds ||
    summaryData.sealant_materials.map((item) => item.scanned).includes(false);

  const scanMaterialsButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.sealantStatus.finished ||
    summaryData.sealantStatus.idle ||
    !summaryData.sealantTresholds;

  const operationButtonDisabledCondition =
    !employee || !summaryData || !summaryData.sealantStatus.createdAt || summaryData.sealantStatus.finished;

  const pictureButtonDisabledCondition = summaryData === null;

  const endButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.sealantStatus.createdAt ||
    summaryData.sealantStatus.idle ||
    summaryData.sealantStatus.finished;

  const printButtonDisabledCondition =
    !employee || !summaryData || summaryData.sealantStatus.idle || summaryData.sealantStatus.finished;

  return {
    employee,
    sealantConveyor,
    setOpenAuth,
    setOpenLogout,
    setOpenMaterialScan,
    setOpenCloseSummary,
    inputParametersButtonDisabledCondition,
    scanMaterialsButtonDisabledCondition,
    operationButtonDisabledCondition,
    pictureButtonDisabledCondition,
    endButtonDisabledCondition,
    printButtonDisabledCondition,
  };
}
