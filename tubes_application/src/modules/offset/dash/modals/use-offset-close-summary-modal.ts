import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useShallow } from "zustand/shallow";
import { useCreateOffsetStatus } from "../../use-create-offset-status";
import { useOffsetCloseSummaryModalStore, useOffsetDefectInputModalStore } from "../../store/use-offset-modal-store";
import { useOffsetDefectStore } from "../../store/use-offset-defect-store";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";
import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";

export default function useOffsetCloseSummaryModal() {
  const open = useOffsetCloseSummaryModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetCloseSummaryModalStore(useShallow((state) => state.setOpen));
  const setOpenEntryModal = useOffsetDefectInputModalStore(useShallow((state) => state.setOpen));
  const clearData = useOffsetDefectStore(useShallow((state) => state.clearData));
  const data = useOffsetDefectStore(useShallow((state) => state.data));
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const { createOffsetStatus } = useCreateOffsetStatus();
  const { data: summaryData } = useActiveSummary(offsetConveyor?.id ?? null);

  const handleAddButtonClick = () => {
    setOpenEntryModal(true);
  };

  const handleEndButtonClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        employee_id: employee.id,
        operation_id: null,
        idle: false,
        finished: true,
        defect_value: data,
      };

      createOffsetStatus(dto);
    }
    setOpen(false);
    setOpenEntryModal(false);
    clearData();
  };
  return { open, setOpen, data, clearData, handleAddButtonClick, handleEndButtonClick };
}
