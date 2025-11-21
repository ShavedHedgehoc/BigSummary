import type { CreateOffsetEntryDto } from "@/shared/api/services/params-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { RouteNames } from "@/shared/router/route-names";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";

import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";

import { initDataValue, useOffsetInputStore } from "../../store/use-offset-input-store";
import { useOffsetCloseConfirmModalStore } from "../../store/use-offset-modal-store";
import { useCreateOffsetEntry } from "../../use-create-offset-entry";
import type { ISummary } from "@/shared/api/services/summary-service";
import { useEOffsetEntryAlertModalStore } from "../../store/use-offset-entry-alert-modal-store";

export default function useOffsetAddEntryMenu(summaryData: ISummary | null) {
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const setOpenConfirm = useOffsetCloseConfirmModalStore(useShallow((state) => state.setOpen));
  const data = useOffsetInputStore(useShallow((state) => state.data));
  const setOpenAlert = useEOffsetEntryAlertModalStore((state) => state.setOpen);
  const setDto = useEOffsetEntryAlertModalStore((state) => state.setDto);
  const initData = useOffsetInputStore(useShallow((state) => state.initData));
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const { createOffsetEntry } = useCreateOffsetEntry();
  const navigate = useNavigate();

  const saveButtonDisabledCondition =
    !employee ||
    data.counter_value === "0" ||
    data.printing_machine_speed === "0" ||
    data.total_air_pressure === "0" ||
    data.padding_furnace_temp === "0" ||
    data.offset_furnace_temp === "0" ||
    data.printer_motor === "0" ||
    data.base_covers_holders_motor === "0" ||
    data.base_covers_station_motor === "0" ||
    (summaryData?.offsetTresholds?.imprint_quantity_printed_box_1_max &&
      summaryData?.offsetTresholds?.imprint_quantity_printed_box_1_min &&
      data.imprint_quantity_printed_box_1 === "0") ||
    (summaryData?.offsetTresholds?.imprint_quantity_printed_box_2_max &&
      summaryData?.offsetTresholds?.imprint_quantity_printed_box_2_min &&
      data.imprint_quantity_printed_box_2 === "0") ||
    (summaryData?.offsetTresholds?.imprint_quantity_printed_box_3_max &&
      summaryData?.offsetTresholds?.imprint_quantity_printed_box_3_min &&
      data.imprint_quantity_printed_box_3 === "0") ||
    (summaryData?.offsetTresholds?.imprint_quantity_printed_box_4_max &&
      summaryData?.offsetTresholds?.imprint_quantity_printed_box_4_min &&
      data.imprint_quantity_printed_box_4 === "0") ||
    (summaryData?.offsetTresholds?.imprint_quantity_printed_box_5_max &&
      summaryData?.offsetTresholds?.imprint_quantity_printed_box_5_min &&
      data.imprint_quantity_printed_box_5 === "0") ||
    (summaryData?.offsetTresholds?.imprint_quantity_printed_box_6_max &&
      summaryData?.offsetTresholds?.imprint_quantity_printed_box_6_min &&
      data.imprint_quantity_printed_box_6 === "0") ||
    data.ink_supply_time === "0";

  const tresholdsData = summaryData?.offsetTresholds ?? null;

  const alertDialogCondition =
    tresholdsData &&
    (Number(data.printing_machine_speed) < tresholdsData.printing_machine_speed_min ||
      Number(data.printing_machine_speed) > tresholdsData.printing_machine_speed_max ||
      Number(data.total_air_pressure) < tresholdsData.total_air_pressure_min ||
      Number(data.total_air_pressure) > tresholdsData.total_air_pressure_max ||
      Number(data.padding_furnace_temp) < tresholdsData.padding_furnace_temp_min ||
      Number(data.padding_furnace_temp) > tresholdsData.padding_furnace_temp_max ||
      Number(data.offset_furnace_temp) < tresholdsData.offset_furnace_temp_min ||
      Number(data.offset_furnace_temp) > tresholdsData.offset_furnace_temp_max ||
      Number(data.printer_motor) < tresholdsData.printer_motor_min ||
      Number(data.printer_motor) > tresholdsData.printer_motor_max ||
      Number(data.base_covers_holders_motor) < tresholdsData.base_covers_holders_motor_min ||
      Number(data.base_covers_holders_motor) > tresholdsData.base_covers_holders_motor_max ||
      Number(data.base_covers_station_motor) < tresholdsData.base_covers_station_motor_min ||
      Number(data.base_covers_station_motor) > tresholdsData.base_covers_station_motor_max ||
      //
      (tresholdsData.imprint_quantity_printed_box_1_min &&
        tresholdsData.imprint_quantity_printed_box_1_max &&
        Number(data.imprint_quantity_printed_box_1) < tresholdsData.imprint_quantity_printed_box_1_min) ||
      (tresholdsData.imprint_quantity_printed_box_1_min &&
        tresholdsData.imprint_quantity_printed_box_1_max &&
        Number(data.imprint_quantity_printed_box_1) > tresholdsData.imprint_quantity_printed_box_1_max) ||
      //
      (tresholdsData.imprint_quantity_printed_box_2_min &&
        tresholdsData.imprint_quantity_printed_box_2_max &&
        Number(data.imprint_quantity_printed_box_2) < tresholdsData.imprint_quantity_printed_box_2_min) ||
      (tresholdsData.imprint_quantity_printed_box_2_min &&
        tresholdsData.imprint_quantity_printed_box_2_max &&
        Number(data.imprint_quantity_printed_box_2) > tresholdsData.imprint_quantity_printed_box_2_max) ||
      //
      (tresholdsData.imprint_quantity_printed_box_3_min &&
        tresholdsData.imprint_quantity_printed_box_3_max &&
        Number(data.imprint_quantity_printed_box_3) < tresholdsData.imprint_quantity_printed_box_3_min) ||
      (tresholdsData.imprint_quantity_printed_box_3_min &&
        tresholdsData.imprint_quantity_printed_box_3_max &&
        Number(data.imprint_quantity_printed_box_3) > tresholdsData.imprint_quantity_printed_box_3_max) ||
      //
      (tresholdsData.imprint_quantity_printed_box_4_min &&
        tresholdsData.imprint_quantity_printed_box_4_max &&
        Number(data.imprint_quantity_printed_box_4) < tresholdsData.imprint_quantity_printed_box_4_min) ||
      (tresholdsData.imprint_quantity_printed_box_4_min &&
        tresholdsData.imprint_quantity_printed_box_4_max &&
        Number(data.imprint_quantity_printed_box_4) > tresholdsData.imprint_quantity_printed_box_4_max) ||
      //
      (tresholdsData.imprint_quantity_printed_box_5_min &&
        tresholdsData.imprint_quantity_printed_box_5_max &&
        Number(data.imprint_quantity_printed_box_5) < tresholdsData.imprint_quantity_printed_box_5_min) ||
      (tresholdsData.imprint_quantity_printed_box_5_min &&
        tresholdsData.imprint_quantity_printed_box_5_max &&
        Number(data.imprint_quantity_printed_box_5) > tresholdsData.imprint_quantity_printed_box_5_max) ||
      //
      (tresholdsData.imprint_quantity_printed_box_6_min &&
        tresholdsData.imprint_quantity_printed_box_6_max &&
        Number(data.imprint_quantity_printed_box_6) < tresholdsData.imprint_quantity_printed_box_6_min) ||
      (tresholdsData.imprint_quantity_printed_box_6_min &&
        tresholdsData.imprint_quantity_printed_box_6_max &&
        Number(data.imprint_quantity_printed_box_6) > tresholdsData.imprint_quantity_printed_box_6_max) ||
      //
      Number(data.ink_supply_time) < tresholdsData.ink_supply_time_min ||
      Number(data.ink_supply_time) > tresholdsData.ink_supply_time_max ||
      data.design_match === false ||
      data.tube_apperarance === false ||
      data.tube_edge_deformation_lack === false ||
      data.aluminium_clearance_lack === false ||
      data.drips_lack === false ||
      Number(data.counter_value) > CountersTresholds.COUNTERS_MAX_TRESHOLD ||
      Number(data.counter_value) < CountersTresholds.COUNTERS_MIN_TRESHOLD);

  const handleSaveClick = () => {
    if (summaryData && data && employee) {
      const dto: CreateOffsetEntryDto = {
        summary_id: summaryData.data.id,
        counter_value: Number(data.counter_value),
        employee_id: employee.id,
        printing_machine_speed: Number(data.printing_machine_speed),
        total_air_pressure: Number(data.total_air_pressure),
        padding_furnace_temp: Number(data.padding_furnace_temp),
        offset_furnace_temp: Number(data.offset_furnace_temp),
        printer_motor: Number(data.printer_motor),
        base_covers_holders_motor: Number(data.base_covers_holders_motor),
        base_covers_station_motor: Number(data.base_covers_station_motor),
        imprint_quantity_printed_box_1: Number(data.imprint_quantity_printed_box_1),
        imprint_quantity_printed_box_2: Number(data.imprint_quantity_printed_box_2),
        imprint_quantity_printed_box_3: Number(data.imprint_quantity_printed_box_3),
        imprint_quantity_printed_box_4: Number(data.imprint_quantity_printed_box_4),
        imprint_quantity_printed_box_5: Number(data.imprint_quantity_printed_box_5),
        imprint_quantity_printed_box_6: Number(data.imprint_quantity_printed_box_6),
        ink_supply_time: Number(data.ink_supply_time),
        design_match: data.design_match,
        tube_apperarance: data.tube_apperarance,
        tube_edge_deformation_lack: data.tube_edge_deformation_lack,
        aluminium_clearance_lack: data.aluminium_clearance_lack,
        drips_lack: data.drips_lack,
      };
      if (alertDialogCondition) {
        setDto(dto);
        setOpenAlert(true);
        return;
      }
      if (dto) createOffsetEntry(dto);
      navigate(`${RouteNames.OFFSET_ROOT}/${offsetConveyor?.name}`);
      initData();
    }
  };

  const isInputsChanged = data !== initDataValue;

  const handleExitClick = () => {
    isInputsChanged ? setOpenConfirm(true) : navigate(`${RouteNames.OFFSET_ROOT}/${offsetConveyor?.name}`);
  };

  return { saveButtonDisabledCondition, handleSaveClick, handleExitClick };
}
