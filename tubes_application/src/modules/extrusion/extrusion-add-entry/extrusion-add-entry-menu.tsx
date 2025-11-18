import MenuButton, { type MenuButtonProps } from "@/modules/common/menu-button";
import { TbX, TbDeviceFloppy } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";
import { useExtrusionEmployeeStore } from "../store/use-extrusion-employee-store";
import Menu from "@/modules/common/menu";
import { useExtrusionCloseConfirmModalStore } from "../store/use-extrusion-auth-modal-store";
import { useExtrusionInputCurrentParametersStore } from "../store/use-extrusion-input-current-parameters-store";
import type { ISummary } from "@/shared/api/services/summary-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import type { CreateExtrusionEntryDto } from "@/shared/api/services/extrusion-service";
import { useExtrusionEntryAlertModalStore } from "../store/use-extrusion-entry-alert-modal-store";
import { useCreateExtrusionEntry } from "../use-create-extrusion-entry";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import { useExtrusionConveyorStore } from "../store/use-extrusion-conveyor-store";

export default function ExtrusionAddEntryMenu({ summaryData }: { summaryData: ISummary | null }) {
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const setOpenConfirm = useExtrusionCloseConfirmModalStore(useShallow((state) => state.setOpen));
  const data = useExtrusionInputCurrentParametersStore(useShallow((state) => state.data));
  const setOpenAlert = useExtrusionEntryAlertModalStore((state) => state.setOpen);
  const setDto = useExtrusionEntryAlertModalStore((state) => state.setDto);
  const initData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.initData));
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const { createExtrusionEntry } = useCreateExtrusionEntry();
  const navigate = useNavigate();

  const saveButtonDisabledCondition =
    !employee ||
    data.counter_value === "0" ||
    data.press_speed === "0" ||
    data.blow_time === "0" ||
    data.turning_machine_speed === "0" ||
    data.annealing_furnace_temp === "0" ||
    data.tube_cilindrical_section_length === "0" ||
    data.membrane_thickness === "0" ||
    data.tube_diameter === "0" ||
    data.tube_cilindrical_thikness === "0" ||
    data.tube_rigidity === "0" ||
    data.rondel_type_id === null;

  const tresholdsData =
    summaryData && summaryData.production && summaryData.production.extrusion_tresholds.length
      ? summaryData.production.extrusion_tresholds[0]
      : null;

  const alertDialogCondition =
    tresholdsData &&
    (Number(data.annealing_furnace_temp) < tresholdsData.annealing_furnace_temp_min ||
      Number(data.annealing_furnace_temp) > tresholdsData.annealing_furnace_temp_max ||
      Number(data.blow_time) < tresholdsData.blow_time_min ||
      Number(data.blow_time) > tresholdsData.blow_time_max ||
      Number(data.press_speed) < tresholdsData.press_speed_min ||
      Number(data.press_speed) > tresholdsData.press_speed_max ||
      Number(data.turning_machine_speed) < tresholdsData.turning_machine_speed_min ||
      Number(data.turning_machine_speed) > tresholdsData.turning_machine_speed_max ||
      Number(data.membrane_thickness) > tresholdsData.membrane_thickness_max ||
      Number(data.membrane_thickness) < tresholdsData.membrane_thickness_min ||
      Number(data.tube_cilindrical_section_length) < tresholdsData.tube_cilindrical_section_length_min ||
      Number(data.tube_cilindrical_section_length) > tresholdsData.tube_cilindrical_section_length_max ||
      Number(data.tube_diameter) > tresholdsData.tube_diameter_max ||
      Number(data.tube_diameter) < tresholdsData.tube_diameter_min ||
      Number(data.tube_cilindrical_thikness) > tresholdsData.tube_cilindrical_section_thickness_max ||
      Number(data.tube_cilindrical_thikness) < tresholdsData.tube_cilindrical_section_thickness_min ||
      Number(data.tube_rigidity) > tresholdsData.tube_rigidity_max ||
      Number(data.tube_rigidity) < tresholdsData.tube_rigidity_min ||
      Number(data.rondel_type_id) !== tresholdsData.rondel_type_id ||
      data.external_thread_quality === false ||
      data.tightness === false ||
      data.tube_cutting_quality === false ||
      Number(data.counter_value) > CountersTresholds.COUNTERS_MAX_TRESHOLD ||
      Number(data.counter_value) < CountersTresholds.COUNTERS_MIN_TRESHOLD);

  const handleSaveClick = () => {
    if (summaryData && data && employee) {
      const dto: CreateExtrusionEntryDto = {
        summary_id: summaryData.id,
        counter_value: Number(data.counter_value),
        press_speed: Number(data.press_speed),
        blow_time: Number(data.blow_time),
        turning_machine_speed: Number(data.turning_machine_speed),
        annealing_furnace_temp: Number(data.annealing_furnace_temp),
        employee_id: employee.id,
        rondel_type_id: Number(data.rondel_type_id ?? 1),
        tube_cilindrical_section_length: Number(data.tube_cilindrical_section_length),
        membrane_thickness: Number(data.membrane_thickness),
        tube_diameter: Number(data.tube_diameter),
        tube_cilindrical_section_thickness: Number(data.tube_cilindrical_thikness),
        tube_rigidity: Number(data.tube_rigidity),
        tube_cutting_quality: data.tube_cutting_quality,
        tightness: data.tightness,
        external_thread_quality: data.external_thread_quality,
      };
      if (alertDialogCondition) {
        setDto(dto);
        setOpenAlert(true);
        return;
      }
      if (dto) createExtrusionEntry(dto);
      navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
      initData();
    }
  };

  const backButtonProps: MenuButtonProps = {
    title: "Закрыть",
    icon: <TbX />,
    disabled: false,
    action: () => setOpenConfirm(true),
  };

  const saveButtonProps: MenuButtonProps = {
    title: "Сохранить",
    icon: <TbDeviceFloppy />,
    disabled: saveButtonDisabledCondition,
    action: () => handleSaveClick(),
  };

  return (
    <Menu>
      <MenuButton {...backButtonProps} />
      <MenuButton {...saveButtonProps} />
    </Menu>
  );
}
