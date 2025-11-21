import type { CreateVarnishEntryDto } from "@/shared/api/services/params-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import type { ISummary } from "@/shared/api/services/summary-service";
import { useVarnishEmployeeStore } from "../../store/use-varnish-employee-store";
import { useVarnishCloseConfirmModalStore } from "../../store/use-varnish-modal-store";
import { initDataValue, useVarnishInputStore } from "../../store/use-varnish-input-store";
import { useVarnishEntryAlertModalStore } from "../../store/use-varnish-entry-alert-modal-store";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import { useCreateVarnishEntry } from "../../use-create-varnish-entry";

export default function useVarnishAddEntryMenu(summaryData: ISummary | null) {
  const employee = useVarnishEmployeeStore(useShallow((state) => state.varnishEmployee));
  const setOpenConfirm = useVarnishCloseConfirmModalStore(useShallow((state) => state.setOpen));
  const data = useVarnishInputStore(useShallow((state) => state.data));
  const setOpenAlert = useVarnishEntryAlertModalStore((state) => state.setOpen);
  const setDto = useVarnishEntryAlertModalStore((state) => state.setDto);
  const initData = useVarnishInputStore(useShallow((state) => state.initData));
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const { createVarnishEntry } = useCreateVarnishEntry();
  const navigate = useNavigate();

  const saveButtonDisabledCondition =
    !employee ||
    data.varnish_machine_speed === "0" ||
    data.total_air_pressure === "0" ||
    data.feed_can_air_pressure === "0" ||
    data.nozzle_regulator_air_pressure === "0" ||
    data.cells_speed === "0" ||
    data.injection_a_start_position === "0" ||
    data.injection_b_start_position === "0" ||
    data.injection_c_start_position === "0" ||
    data.injection_d_start_position === "0" ||
    data.injection_a_end_position === "0" ||
    data.injection_b_end_position === "0" ||
    data.injection_c_end_position === "0" ||
    data.injection_d_end_position === "0" ||
    data.tube_molding_start_position === "0" ||
    data.tube_molding_end_position === "0" ||
    data.polimerization_furnace_temp === "0" ||
    data.internal_varnish_porosity === "0";

  const tresholdsData = summaryData?.varnishTresholds ?? null;

  const alertDialogCondition =
    tresholdsData &&
    (Number(data.varnish_machine_speed) < tresholdsData.varnish_machine_speed_min ||
      Number(data.total_air_pressure) < tresholdsData.total_air_pressure_min ||
      Number(data.feed_can_air_pressure) < tresholdsData.feed_can_air_pressure_min ||
      Number(data.nozzle_regulator_air_pressure) < tresholdsData.nozzle_regulator_air_pressure_min ||
      Number(data.cells_speed) < tresholdsData.cells_speed_min ||
      Number(data.injection_a_start_position) < tresholdsData.injection_a_start_position_min ||
      Number(data.injection_b_start_position) < tresholdsData.injection_b_start_position_min ||
      Number(data.injection_c_start_position) < tresholdsData.injection_c_start_position_min ||
      Number(data.injection_d_start_position) < tresholdsData.injection_d_start_position_min ||
      Number(data.injection_a_end_position) < tresholdsData.injection_a_end_position_min ||
      Number(data.injection_b_end_position) < tresholdsData.injection_b_end_position_min ||
      Number(data.injection_c_end_position) < tresholdsData.injection_c_end_position_min ||
      Number(data.injection_d_end_position) < tresholdsData.injection_d_end_position_min ||
      Number(data.tube_molding_start_position) < tresholdsData.tube_molding_start_position_min ||
      Number(data.tube_molding_end_position) < tresholdsData.tube_molding_end_position_min ||
      Number(data.polimerization_furnace_temp) < tresholdsData.polimerization_furnace_temp_min ||
      Number(data.internal_varnish_porosity) < tresholdsData.internal_varnish_porosity_min ||
      Number(data.varnish_machine_speed) > tresholdsData.varnish_machine_speed_max ||
      Number(data.total_air_pressure) > tresholdsData.total_air_pressure_max ||
      Number(data.feed_can_air_pressure) > tresholdsData.feed_can_air_pressure_max ||
      Number(data.nozzle_regulator_air_pressure) > tresholdsData.nozzle_regulator_air_pressure_max ||
      Number(data.cells_speed) > tresholdsData.cells_speed_max ||
      Number(data.injection_a_start_position) > tresholdsData.injection_a_start_position_max ||
      Number(data.injection_b_start_position) > tresholdsData.injection_b_start_position_max ||
      Number(data.injection_c_start_position) > tresholdsData.injection_c_start_position_max ||
      Number(data.injection_d_start_position) > tresholdsData.injection_d_start_position_max ||
      Number(data.injection_a_end_position) > tresholdsData.injection_a_end_position_max ||
      Number(data.injection_b_end_position) > tresholdsData.injection_b_end_position_max ||
      Number(data.injection_c_end_position) > tresholdsData.injection_c_end_position_max ||
      Number(data.injection_d_end_position) > tresholdsData.injection_d_end_position_max ||
      Number(data.tube_molding_start_position) > tresholdsData.tube_molding_start_position_max ||
      Number(data.tube_molding_end_position) > tresholdsData.tube_molding_end_position_max ||
      Number(data.polimerization_furnace_temp) > tresholdsData.polimerization_furnace_temp_max ||
      Number(data.internal_varnish_porosity) > tresholdsData.internal_varnish_porosity_max ||
      data.internal_sectional_view === false ||
      data.aluminium_clearance_lack === false ||
      data.unpainting_lack === false ||
      Number(data.counter_value) > CountersTresholds.COUNTERS_MAX_TRESHOLD ||
      Number(data.counter_value) < CountersTresholds.COUNTERS_MIN_TRESHOLD);

  const handleSaveClick = () => {
    if (summaryData && data && employee) {
      const dto: CreateVarnishEntryDto = {
        summary_id: summaryData.data.id,
        counter_value: Number(data.counter_value),
        employee_id: employee.id,
        varnish_machine_speed: Number(data.varnish_machine_speed),
        total_air_pressure: Number(data.total_air_pressure),
        feed_can_air_pressure: Number(data.feed_can_air_pressure),
        nozzle_regulator_air_pressure: Number(data.nozzle_regulator_air_pressure),
        cells_speed: Number(data.cells_speed),
        injection_a_start_position: Number(data.injection_a_start_position),
        injection_b_start_position: Number(data.injection_b_start_position),
        injection_c_start_position: Number(data.injection_c_start_position),
        injection_d_start_position: Number(data.injection_d_start_position),
        injection_a_end_position: Number(data.injection_a_end_position),
        injection_b_end_position: Number(data.injection_b_end_position),
        injection_c_end_position: Number(data.injection_c_end_position),
        injection_d_end_position: Number(data.injection_d_end_position),
        tube_molding_start_position: Number(data.tube_molding_start_position),
        tube_molding_end_position: Number(data.tube_molding_end_position),
        polimerization_furnace_temp: Number(data.polimerization_furnace_temp),
        internal_varnish_porosity: Number(data.internal_varnish_porosity),
        internal_sectional_view: data.internal_sectional_view,
        aluminium_clearance_lack: data.aluminium_clearance_lack,
        unpainting_lack: data.unpainting_lack,
      };
      if (alertDialogCondition) {
        setDto(dto);
        setOpenAlert(true);
        return;
      }
      if (dto) createVarnishEntry(dto);
      navigate(`${RouteNames.VARNISH_ROOT}/${varnishConveyor?.name}`);
      initData();
    }
  };

  const isInputsChanged = data !== initDataValue;

  const handleExitClick = () => {
    isInputsChanged ? setOpenConfirm(true) : navigate(`${RouteNames.VARNISH_ROOT}/${varnishConveyor?.name}`);
  };

  return { saveButtonDisabledCondition, handleSaveClick, handleExitClick };
}
