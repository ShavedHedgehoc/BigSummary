import { useShallow } from "zustand/shallow";
import { useExtrusionCloseSummaryModalStore } from "../../store/use-extrusion-modal-store";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useCreateExtrusionStatus } from "../../use-create-extrusion-status";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";

export default function useExtrusionCloseSummaryAlertModal() {
  const open = useExtrusionCloseSummaryModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionCloseSummaryModalStore(useShallow((state) => state.setOpen));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const { createExtrusionStatus } = useCreateExtrusionStatus();
  const { data: summaryData } = useActiveSummary(extrusionConveyor?.id ?? null);

  const handleOkClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        employee_id: employee.id,
        operation_id: null,
        idle: false,
        finished: true,
      };

      createExtrusionStatus(dto);
    }
    setOpen(false);
  };

  return { open, setOpen, handleOkClick };
}
