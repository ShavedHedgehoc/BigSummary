import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import type { CreateStatusDto } from "@/shared/api/services/status-service";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { useSealantOperationStore } from "../../store/use-sealant-operation-store";
import { useCreateSealantStatus } from "../../use-create-sealant-status";

export default function useSealantOperationsMenu(summaryData: ISummary | null) {
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const selectedOperation = useSealantOperationStore(useShallow((state) => state.selectedOperation));
  const setSelectedOperation = useSealantOperationStore(useShallow((state) => state.setSelectedOperation));
  const { createSealantStatus } = useCreateSealantStatus();
  const navigate = useNavigate();

  const setIdleButtonVisibleCondition =
    summaryData && summaryData.sealantStatus ? (summaryData.sealantStatus.idle === false ? true : false) : false;

  const setWorkingButtonVisibleCondition =
    summaryData && summaryData.sealantStatus ? (summaryData.sealantStatus.idle === true ? true : false) : false;

  const setIdleButtonDisableCondition = !(summaryData && employee && selectedOperation.length);

  const setWorkingButtonDisableCondition = !(summaryData && employee);

  const handleExitClick = () => {
    navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
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
      createSealantStatus(dto);
      navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
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
      createSealantStatus(dto);
      navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
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
