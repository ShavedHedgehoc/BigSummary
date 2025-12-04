import { useShallow } from "zustand/shallow";
import { useSealantCloseSummaryModalStore } from "../../store/use-sealant-modal-store";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { useCreateSealantStatus } from "../../use-create-sealant-status";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";

export default function useSealantCloseSummaryAlertModal() {
  const open = useSealantCloseSummaryModalStore(useShallow((state) => state.open));
  const setOpen = useSealantCloseSummaryModalStore(useShallow((state) => state.setOpen));
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const { createSealantStatus } = useCreateSealantStatus();
  const { data: summaryData } = useActiveSummary(sealantConveyor?.id ?? null);

  const handleOkClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        employee_id: employee.id,
        operation_id: null,
        idle: false,
        finished: true,
      };

      createSealantStatus(dto);
    }
    setOpen(false);
  };

  return { open, setOpen, handleOkClick };
}
