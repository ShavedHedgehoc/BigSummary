import { useShallow } from "zustand/react/shallow";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import { RouteNames } from "@/shared/router/route-names";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useNavigate } from "react-router-dom";
import { useSealantBoxConfirmModalStore } from "../../store/use-sealant-modal-store";
import { usePrinter } from "../../use-printer";
import { useQuantityIntegerModalStore } from "../../store/use-quantity-integer-modal-store";

export default function useSealantPrintMenu({ summaryData }: { summaryData: ISummary | null }) {
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const setOpenConfirm = useSealantBoxConfirmModalStore(useShallow((state) => state.setOpen));
  const setOpenPrint = useQuantityIntegerModalStore(useShallow((state) => state.setOpen));

  const { data: printerData } = usePrinter(sealantConveyor?.id ?? null);

  const navigate = useNavigate();

  const handlePrintClick = () => {
    setOpenPrint(true);
  };

  const printButtonDisabledCondition = !employee || !summaryData || !printerData;
  const confirmButtonDisabledCondition = !employee || !summaryData;

  const handleExitClick = () => {
    navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
  };

  const handleConfirmClick = () => {
    setOpenConfirm(true);
  };

  return {
    handlePrintClick,
    handleConfirmClick,
    handleExitClick,
    printButtonDisabledCondition,
    confirmButtonDisabledCondition,
  };
}
