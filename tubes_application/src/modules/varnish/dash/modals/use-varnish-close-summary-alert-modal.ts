import { useShallow } from "zustand/shallow";
import { useVarnishCloseSummaryModalStore } from "../../store/use-varnish-modal-store";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import { useCreateVarnishStatus } from "../../use-create-varnish-status";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";

export default function useVarnishCloseSummaryAlertModal() {
  const open = useVarnishCloseSummaryModalStore(useShallow((state) => state.open));
  const setOpen = useVarnishCloseSummaryModalStore(useShallow((state) => state.setOpen));
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const { createVarnishStatus } = useCreateVarnishStatus();
  const { data: summaryData } = useActiveSummary(varnishConveyor?.id ?? null);

  const handleOkClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        employee_id: employee.id,
        operation_id: null,
        idle: false,
        finished: true,
      };

      createVarnishStatus(dto);
    }
    setOpen(false);
  };

  return { open, setOpen, handleOkClick };
}
