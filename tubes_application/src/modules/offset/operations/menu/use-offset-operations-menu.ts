import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";
import { useOffsetOperationStore } from "../../store/use-offset-operation-store";
import { useCreateOffsetStatus } from "../../use-create-offset-status";

export default function useOffsetOperationsMenu(summaryData: ISummary | null) {
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const selectedOperation = useOffsetOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useOffsetOperationStore(useShallow((state) => state.setSelectedOperation));
  const { createOffsetStatus } = useCreateOffsetStatus();
  const navigate = useNavigate();

  const setIdleButtonVisibleCondition =
    summaryData && summaryData.offsetStatus ? (summaryData.offsetStatus.idle === false ? true : false) : false;

  const setWorkingButtonVisibleCondition =
    summaryData && summaryData.offsetStatus ? (summaryData.offsetStatus.idle === true ? true : false) : false;

  const setIdleButtonDisableCondition = !(summaryData && employee && selectedOperation.length);

  const setWorkingButtonDisableCondition = !(summaryData && employee);

  const handleExitClick = () => {
    navigate(`${RouteNames.OFFSET_ROOT}/${offsetConveyor?.name}`);
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
      createOffsetStatus(dto);
      navigate(`${RouteNames.OFFSET_ROOT}/${offsetConveyor?.name}`);
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
      createOffsetStatus(dto);
      navigate(`${RouteNames.OFFSET_ROOT}/${offsetConveyor?.name}`);
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
