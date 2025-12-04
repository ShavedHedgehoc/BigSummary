import { useShallow } from "zustand/react/shallow";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import {
  useVarnishAuthModalStore,
  useVarnishMaterialScanModalStore,
  useVarnishLogoutModalStore,
  useVarnishCloseSummaryModalStore,
} from "../../store/use-varnish-modal-store";
import { useActiveSummary } from "@/shared/api/use-active-summary";

export default function useVarnishMenu() {
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const { data: summaryData } = useActiveSummary(varnishConveyor?.id ?? null);
  const setOpenAuth = useVarnishAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useVarnishMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useVarnishLogoutModalStore(useShallow((state) => state.setOpen));
  const setOpenCloseSummary = useVarnishCloseSummaryModalStore(useShallow((state) => state.setOpen));

  const inputParametersButtonDisabledCondition =
    !employee ||
    !summaryData ||
    summaryData.varnishStatus.idle ||
    !summaryData.varnish_materials.length ||
    summaryData.varnishStatus.finished ||
    summaryData.varnish_materials.map((item) => item.scanned).includes(false);

  const scanMaterialsButtonDisabledCondition =
    !employee || !summaryData || summaryData.varnishStatus.finished || summaryData.varnishStatus.idle;

  const operationButtonDisabledCondition =
    !employee || !summaryData || !summaryData.varnishStatus.createdAt || summaryData.varnishStatus.finished;

  const pictureButtonDisabledCondition = summaryData === null;

  const endButtonDisabledCondition =
    !employee ||
    !summaryData ||
    !summaryData.varnishStatus.createdAt ||
    summaryData.varnishStatus.idle ||
    summaryData.varnishStatus.finished;

  return {
    employee,
    varnishConveyor,
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
