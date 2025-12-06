import type { CreateSealantEntryDto } from "@/shared/api/services/params-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import type { ISummary } from "@/shared/api/services/summary-service";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { useSealantCloseConfirmModalStore } from "../../store/use-sealant-modal-store";
import { initDataValue, useSealantInputStore } from "../../store/use-sealant-input-store";
import { useSealantEntryAlertModalStore } from "../../store/use-sealant-entry-alert-modal-store";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useCreateSealantEntry } from "../../use-create-sealant-entry";

export default function useSealantAddEntryMenu(summaryData: ISummary | null) {
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const setOpenConfirm = useSealantCloseConfirmModalStore(useShallow((state) => state.setOpen));
  const data = useSealantInputStore(useShallow((state) => state.data));
  const setOpenAlert = useSealantEntryAlertModalStore((state) => state.setOpen);
  const setDto = useSealantEntryAlertModalStore((state) => state.setDto);
  const initData = useSealantInputStore(useShallow((state) => state.initData));
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const { createSealantEntry } = useCreateSealantEntry();
  const navigate = useNavigate();

  const saveButtonDisabledCondition =
    !employee ||
    data.cap_machine_speed === "0" ||
    data.total_air_pressure === "0" ||
    data.holders_forward === "0" ||
    data.holders_opening_left === "0" ||
    data.holders_opening_right === "0" ||
    data.holders_closing === "0" ||
    data.injection_a_start === "0" ||
    data.injection_b_start === "0" ||
    data.injection_a_end === "0" ||
    data.injection_b_end === "0" ||
    data.injection_tube_orientation_start === "0" ||
    data.injection_tube_orientation_end === "0" ||
    data.latex_ring_padding === "0" ||
    data.latex_ring_width === "0" ||
    data.tube_rigidity === "0" ||
    data.cap_unscrewing_torque === "0";

  const tresholdsData = summaryData?.sealantTresholds ?? null;

  const alertDialogCondition =
    tresholdsData &&
    (Number(data.cap_machine_speed) < tresholdsData.cap_machine_speed_min ||
      Number(data.total_air_pressure) < tresholdsData.total_air_pressure_min ||
      Number(data.holders_forward) < tresholdsData.holders_forward_min ||
      Number(data.holders_opening_left) < tresholdsData.holders_opening_left_min ||
      Number(data.holders_opening_right) < tresholdsData.holders_opening_right_min ||
      Number(data.holders_closing) < tresholdsData.holders_closing_min ||
      Number(data.injection_a_start) < tresholdsData.injection_a_start_min ||
      Number(data.injection_b_start) < tresholdsData.injection_b_start_min ||
      Number(data.injection_a_end) < tresholdsData.injection_a_end_min ||
      Number(data.injection_b_end) < tresholdsData.injection_b_end_min ||
      Number(data.injection_tube_orientation_start) < tresholdsData.injection_tube_orientation_start_min ||
      Number(data.injection_tube_orientation_end) < tresholdsData.injection_tube_orientation_end_min ||
      Number(data.latex_ring_padding) < tresholdsData.latex_ring_padding_min ||
      Number(data.latex_ring_width) < tresholdsData.latex_ring_width_min ||
      Number(data.tube_rigidity) < tresholdsData.tube_rigidity_min ||
      Number(data.cap_unscrewing_torque) < tresholdsData.cap_unscrewing_torque_min ||
      Number(data.cap_machine_speed) > tresholdsData.cap_machine_speed_max ||
      Number(data.total_air_pressure) > tresholdsData.total_air_pressure_max ||
      Number(data.holders_forward) > tresholdsData.holders_forward_max ||
      Number(data.holders_opening_left) > tresholdsData.holders_opening_left_max ||
      Number(data.holders_opening_right) > tresholdsData.holders_opening_right_max ||
      Number(data.holders_closing) > tresholdsData.holders_closing_max ||
      Number(data.injection_a_start) > tresholdsData.injection_a_start_max ||
      Number(data.injection_b_start) > tresholdsData.injection_b_start_max ||
      Number(data.injection_a_end) > tresholdsData.injection_a_end_max ||
      Number(data.injection_b_end) > tresholdsData.injection_b_end_max ||
      Number(data.injection_tube_orientation_start) > tresholdsData.injection_tube_orientation_start_max ||
      Number(data.injection_tube_orientation_end) > tresholdsData.injection_tube_orientation_end_max ||
      Number(data.latex_ring_padding) > tresholdsData.latex_ring_padding_max ||
      Number(data.latex_ring_width) > tresholdsData.latex_ring_width_max ||
      Number(data.tube_rigidity) > tresholdsData.tube_rigidity_max ||
      Number(data.cap_unscrewing_torque) > tresholdsData.cap_unscrewing_torque_max ||
      data.is_cap_surface_smooth === false ||
      Number(data.counter_value) > CountersTresholds.COUNTERS_MAX_TRESHOLD ||
      Number(data.counter_value) < CountersTresholds.COUNTERS_MIN_TRESHOLD);

  const handleSaveClick = () => {
    if (summaryData && data && employee) {
      const dto: CreateSealantEntryDto = {
        summary_id: summaryData.data.id,
        counter_value: Number(data.counter_value),
        employee_id: employee.id,
        cap_machine_speed: Number(data.cap_machine_speed),
        total_air_pressure: Number(data.total_air_pressure),
        holders_forward: Number(data.holders_forward),
        holders_opening_left: Number(data.holders_opening_left),
        holders_opening_right: Number(data.holders_opening_right),
        holders_closing: Number(data.holders_closing),
        injection_a_start: Number(data.injection_a_start),
        injection_b_start: Number(data.injection_b_start),
        injection_a_end: Number(data.injection_a_end),
        injection_b_end: Number(data.injection_b_end),
        injection_tube_orientation_start: Number(data.injection_tube_orientation_start),
        injection_tube_orientation_end: Number(data.injection_tube_orientation_end),
        latex_ring_padding: Number(data.latex_ring_padding),
        latex_ring_width: Number(data.latex_ring_width),
        tube_rigidity: Number(data.tube_rigidity),
        cap_unscrewing_torque: Number(data.cap_unscrewing_torque),
        is_cap_surface_smooth: data.is_cap_surface_smooth,
      };
      if (alertDialogCondition) {
        setDto(dto);
        setOpenAlert(true);
        return;
      }
      if (dto) createSealantEntry(dto);
      navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
      initData();
    }
  };

  const isInputsChanged = data !== initDataValue;

  const handleExitClick = () => {
    if (isInputsChanged) {
      setOpenConfirm(true);
    } else {
      navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
    }
  };

  return { saveButtonDisabledCondition, handleSaveClick, handleExitClick };
}
