import { Stack } from "@mui/joy";
import { TresholdsMinMaxEntry } from "../shared/tresholds-min-max-entry";
import { useSealantTresholds } from "./use-sealant-tresholds";
import { SealantTresholdsParams } from "../store/use-tube-sealant-tresholds-store";
import { ParameterNames } from "../shared/parameter-names";

export default function TresholdsSealantListContent() {
  const { tresholds, changeTresholds } = useSealantTresholds();

  return (
    <Stack spacing={2}>
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.CAP_MACHINE_SPEED_MIN}
        idMax={SealantTresholdsParams.CAP_MACHINE_SPEED_MAX}
        title={`${ParameterNames.SEALANT_CAP_MACHINE_SPEED}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.cap_machine_speed_min}
        maxValue={tresholds.cap_machine_speed_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.TOTAL_AIR_PRESSURE_MIN}
        idMax={SealantTresholdsParams.TOTAL_AIR_PRESSURE_MAX}
        title={`${ParameterNames.SEALANT_TOTAL_AIR_PRESSURE}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.total_air_pressure_min}
        maxValue={tresholds.total_air_pressure_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.HOLDERS_FORWARD_MIN}
        idMax={SealantTresholdsParams.HOLDERS_FORWARD_MAX}
        title={`${ParameterNames.SEALANT_HOLDERS_FORWARD}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.holders_forward_min}
        maxValue={tresholds.holders_forward_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.HOLDERS_OPENING_LEFT_MIN}
        idMax={SealantTresholdsParams.HOLDERS_OPENING_LEFT_MAX}
        title={`${ParameterNames.SEALANT_HOLDERS_OPENING_LEFT}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.holders_opening_left_min}
        maxValue={tresholds.holders_opening_left_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.HOLDERS_OPENING_RIGHT_MIN}
        idMax={SealantTresholdsParams.HOLDERS_OPENING_RIGHT_MAX}
        title={`${ParameterNames.SEALANT_HOLDERS_OPENING_RIGHT}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.holders_opening_right_min}
        maxValue={tresholds.holders_opening_right_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.HOLDERS_CLOSING_MIN}
        idMax={SealantTresholdsParams.HOLDERS_CLOSING_MAX}
        title={`${ParameterNames.SEALANT_HOLDERS_CLOSING}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.holders_closing_min}
        maxValue={tresholds.holders_closing_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.INJECTION_A_START_MIN}
        idMax={SealantTresholdsParams.INJECTION_A_START_MAX}
        title={`${ParameterNames.SEALANT_INJECTION_A_START}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_a_start_min}
        maxValue={tresholds.injection_a_start_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.INJECTION_B_START_MIN}
        idMax={SealantTresholdsParams.INJECTION_B_START_MAX}
        title={`${ParameterNames.SEALANT_INJECTION_B_START}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_b_start_min}
        maxValue={tresholds.injection_b_start_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.INJECTION_A_END_MIN}
        idMax={SealantTresholdsParams.INJECTION_A_END_MAX}
        title={`${ParameterNames.SEALANT_INJECTION_A_END}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_a_end_min}
        maxValue={tresholds.injection_a_end_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.INJECTION_B_END_MIN}
        idMax={SealantTresholdsParams.INJECTION_B_END_MAX}
        title={`${ParameterNames.SEALANT_INJECTION_B_END}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_b_end_min}
        maxValue={tresholds.injection_b_end_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.INJECTION_TUBE_ORIENTATION_START_MIN}
        idMax={SealantTresholdsParams.INJECTION_TUBE_ORIENTATION_START_MAX}
        title={`${ParameterNames.SEALANT_INJECTION_TUBE_ORIENTATION_START}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_tube_orientation_start_min}
        maxValue={tresholds.injection_tube_orientation_start_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.INJECTION_TUBE_ORIENTATION_END_MIN}
        idMax={SealantTresholdsParams.INJECTION_TUBE_ORIENTATION_END_MAX}
        title={`${ParameterNames.SEALANT_INJECTION_TUBE_ORIENTATION_END}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_tube_orientation_end_min}
        maxValue={tresholds.injection_tube_orientation_end_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.LATEX_RING_PADDING_MIN}
        idMax={SealantTresholdsParams.LATEX_RING_PADDING_MAX}
        title={`${ParameterNames.SEALANT_LATEX_RING_PADDING}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.latex_ring_padding_min}
        maxValue={tresholds.latex_ring_padding_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.LATEX_RING_WIDTH_MIN}
        idMax={SealantTresholdsParams.LATEX_RING_WIDTH_MAX}
        title={`${ParameterNames.SEALANT_LATEX_RING_WIDTH}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.latex_ring_width_min}
        maxValue={tresholds.latex_ring_width_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.TUBE_RIGIDITY_MIN}
        idMax={SealantTresholdsParams.TUBE_RIGIDITY_MAX}
        title={`${ParameterNames.SEALANT_TUBE_RIGIDITY}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.tube_rigidity_min}
        maxValue={tresholds.tube_rigidity_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={SealantTresholdsParams.CAP_UNSCREWING_TORQUE_MIN}
        idMax={SealantTresholdsParams.CAP_UNSCREWING_TORQUE_MAX}
        title={`${ParameterNames.SEALANT_CAP_UNSCREWING_TORQUE}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.cap_unscrewing_torque_min}
        maxValue={tresholds.cap_unscrewing_torque_max}
        onChange={changeTresholds}
      />
    </Stack>
  );
}
