import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import { useShallow } from "zustand/shallow";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import { useExtrusionDefectStore } from "../../store/use-extrusion-defect-store";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import {
  useExtrusionCloseSummaryModalStore,
  useExtrusionDefectInputModalStore,
} from "../../store/use-extrusion-modal-store";
import { useCreateExtrusionStatus } from "../../use-create-extrusion-status";

export default function useExtrusionCloseSummaryModal() {
  const open = useExtrusionCloseSummaryModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionCloseSummaryModalStore(useShallow((state) => state.setOpen));
  const setOpenEntryModal = useExtrusionDefectInputModalStore(useShallow((state) => state.setOpen));
  const clearData = useExtrusionDefectStore(useShallow((state) => state.clearData));
  const data = useExtrusionDefectStore(useShallow((state) => state.data));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const { createExtrusionStatus } = useCreateExtrusionStatus();
  const { data: summaryData } = useActiveSummary(extrusionConveyor?.id ?? null);

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

      createExtrusionStatus(dto);
    }
    setOpen(false);
    setOpenEntryModal(false);
    clearData();
  };
  return { open, setOpen, data, clearData, handleAddButtonClick, handleEndButtonClick };
}
