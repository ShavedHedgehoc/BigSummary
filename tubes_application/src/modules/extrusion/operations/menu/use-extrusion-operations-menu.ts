import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useExtrusionOperationStore } from "../../store/use-extrusion-operation-store";
import { useCreateExtrusionStatus } from "../../use-create-extrusion-status";

export default function useExtrusionOperationsMenu(summaryData: ISummary | null) {
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const selectedOperation = useExtrusionOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useExtrusionOperationStore(useShallow((state) => state.setSelectedOperation));
  const { createExtrusionStatus } = useCreateExtrusionStatus();
  const navigate = useNavigate();

  const setIdleButtonVisibleCondition =
    summaryData && summaryData.extrusionStatus ? (summaryData.extrusionStatus.idle === false ? true : false) : false;

  const setWorkingButtonVisibleCondition =
    summaryData && summaryData.extrusionStatus ? (summaryData.extrusionStatus.idle === true ? true : false) : false;

  const setIdleButtonDisableCondition = !(summaryData && employee && selectedOperation.length);

  const setWorkingButtonDisableCondition = !(summaryData && employee);

  const handleExitClick = () => {
    navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
  };

  const handleSetClick = () => {
    if (summaryData && employee && selectedOperation.length) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        employee_id: employee.id,
        operation_id: Number(selectedOperation[0]),
        idle: true,
        finished: false,
      };
      createExtrusionStatus(dto);
      navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
      setSelectedOperation([]);
    }
  };

  const handleWorkingClick = () => {
    if (summaryData && employee) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        employee_id: employee.id,
        operation_id: null,
        idle: false,
        finished: false,
      };
      createExtrusionStatus(dto);
      navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
      setSelectedOperation([]);
    }
  };

  return {
    handleSetClick,
    handleWorkingClick,
    handleExitClick,
    setIdleButtonVisibleCondition,
    setWorkingButtonVisibleCondition,
    setIdleButtonDisableCondition,
    setWorkingButtonDisableCondition,
  };
}
