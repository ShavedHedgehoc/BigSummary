import { useShallow } from "zustand/shallow";
import { useOffsetCloseSummaryModalStore } from "../../store/use-offset-modal-store";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";
import { useCreateOffsetStatus } from "../../use-create-offset-status";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";

export default function useOffsetCloseSummaryAlertModal() {
  const open = useOffsetCloseSummaryModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetCloseSummaryModalStore(useShallow((state) => state.setOpen));
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const { createOffsetStatus } = useCreateOffsetStatus();
  const { data: summaryData } = useActiveSummary(offsetConveyor?.id ?? null);

  const handleOkClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        employee_id: employee.id,
        operation_id: null,
        idle: false,
        finished: true,
      };

      createOffsetStatus(dto);
    }
    setOpen(false);
  };

  return { open, setOpen, handleOkClick };
}
