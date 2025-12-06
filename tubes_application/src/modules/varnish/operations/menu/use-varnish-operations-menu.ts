import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import { useVarnishOperationStore } from "../../store/use-varnish-operation-store";
import { useCreateVarnishStatus } from "../../use-create-varnish-status";

export default function useVarnishOperationsMenu(summaryData: ISummary | null) {
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));
  const selectedOperation = useVarnishOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useVarnishOperationStore(useShallow((state) => state.setSelectedOperation));
  const { createVarnishStatus } = useCreateVarnishStatus();
  const navigate = useNavigate();

  const setIdleButtonVisibleCondition =
    summaryData && summaryData.varnishStatus ? (summaryData.varnishStatus.idle === false ? true : false) : false;

  const setWorkingButtonVisibleCondition =
    summaryData && summaryData.varnishStatus ? (summaryData.varnishStatus.idle === true ? true : false) : false;

  const setIdleButtonDisableCondition = !(summaryData && employee && selectedOperation);

  const setWorkingButtonDisableCondition = !(summaryData && employee);

  const handleExitClick = () => {
    navigate(`${RouteNames.VARNISH_ROOT}/${varnishConveyor?.name}`);
    setSelectedOperation(null);
  };

  const handleSetClick = () => {
    if (summaryData && employee && selectedOperation) {
      const dto: CreateStatusDto = {
        summary_id: summaryData.data.id,
        employee_id: employee.id,
        operation_id: Number(selectedOperation.id),
        idle: true,
        finished: false,
      };
      createVarnishStatus(dto);
      navigate(`${RouteNames.VARNISH_ROOT}/${varnishConveyor?.name}`);
      setSelectedOperation(null);
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
      createVarnishStatus(dto);
      navigate(`${RouteNames.VARNISH_ROOT}/${varnishConveyor?.name}`);
      setSelectedOperation(null);
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
