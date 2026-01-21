import { Stack } from "@mui/joy";
import { TresholdsMinMaxEntry } from "../shared/tresholds-min-max-entry";
import { useVarnishTresholds } from "./use-varnish-tresholds";
import { VarnishTresholdsParams } from "../store/use-tube-varnish-tresholds-store";
import { ParameterNames } from "../shared/parameter-names";

export default function TresholdsVarnishListContent() {
  const { tresholds, changeTresholds } = useVarnishTresholds();

  return (
    <Stack spacing={2}>
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.VARNISH_MACHINE_SPEED_MIN}
        idMax={VarnishTresholdsParams.VARNISH_MACHINE_SPEED_MAX}
        title={`${ParameterNames.VARNISH_VARNISH_MACHINE_SPEED}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.varnish_machine_speed_min}
        maxValue={tresholds.varnish_machine_speed_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.TOTAL_AIR_PRESSURE_MIN}
        idMax={VarnishTresholdsParams.TOTAL_AIR_PRESSURE_MAX}
        title={`${ParameterNames.VARNISH_TOTAL_AIR_PRESSURE}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.total_air_pressure_min}
        maxValue={tresholds.total_air_pressure_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.FEED_CAN_AIR_PRESSURE_MIN}
        idMax={VarnishTresholdsParams.FEED_CAN_AIR_PRESSURE_MAX}
        title={`${ParameterNames.VARNISH_FEED_CAN_AIR_PRESSURE}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.feed_can_air_pressure_min}
        maxValue={tresholds.feed_can_air_pressure_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.NOZZLE_REGULATOR_AIR_PRESSURE_MIN}
        idMax={VarnishTresholdsParams.NOZZLE_REGULATOR_AIR_PRESSURE_MAX}
        title={`${ParameterNames.VARNISH_NOZZLE_REGULATOR_AIR_PRESSURE}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.nozzle_regulator_air_pressure_min}
        maxValue={tresholds.nozzle_regulator_air_pressure_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.CELLS_SPEED_MIN}
        idMax={VarnishTresholdsParams.CELLS_SPEED_MAX}
        title={`${ParameterNames.VARNISH_CELLS_SPEED}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.cells_speed_min}
        maxValue={tresholds.cells_speed_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INJECTION_A_START_POSITION_MIN}
        idMax={VarnishTresholdsParams.INJECTION_A_START_POSITION_MAX}
        title={`${ParameterNames.VARNISH_INJECTION_A_START_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_a_start_position_min}
        maxValue={tresholds.injection_a_start_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INJECTION_B_START_POSITION_MIN}
        idMax={VarnishTresholdsParams.INJECTION_B_START_POSITION_MAX}
        title={`${ParameterNames.VARNISH_INJECTION_B_START_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_b_start_position_min}
        maxValue={tresholds.injection_b_start_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INJECTION_C_START_POSITION_MIN}
        idMax={VarnishTresholdsParams.INJECTION_C_START_POSITION_MAX}
        title={`${ParameterNames.VARNISH_INJECTION_C_START_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_c_start_position_min}
        maxValue={tresholds.injection_c_start_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INJECTION_D_START_POSITION_MIN}
        idMax={VarnishTresholdsParams.INJECTION_D_START_POSITION_MAX}
        title={`${ParameterNames.VARNISH_INJECTION_D_START_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_d_start_position_min}
        maxValue={tresholds.injection_d_start_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INJECTION_A_END_POSITION_MIN}
        idMax={VarnishTresholdsParams.INJECTION_A_END_POSITION_MAX}
        title={`${ParameterNames.VARNISH_INJECTION_A_END_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_a_end_position_min}
        maxValue={tresholds.injection_a_end_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INJECTION_B_END_POSITION_MIN}
        idMax={VarnishTresholdsParams.INJECTION_B_END_POSITION_MAX}
        title={`${ParameterNames.VARNISH_INJECTION_B_END_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_b_end_position_min}
        maxValue={tresholds.injection_b_end_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INJECTION_C_END_POSITION_MIN}
        idMax={VarnishTresholdsParams.INJECTION_C_END_POSITION_MAX}
        title={`${ParameterNames.VARNISH_INJECTION_C_END_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_c_end_position_min}
        maxValue={tresholds.injection_c_end_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INJECTION_D_END_POSITION_MIN}
        idMax={VarnishTresholdsParams.INJECTION_D_END_POSITION_MAX}
        title={`${ParameterNames.VARNISH_INJECTION_D_END_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.injection_d_end_position_min}
        maxValue={tresholds.injection_d_end_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.TUBE_MOLDING_START_POSITION_MIN}
        idMax={VarnishTresholdsParams.TUBE_MOLDING_START_POSITION_MAX}
        title={`${ParameterNames.VARNISH_TUBE_MOLDING_START_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.tube_molding_start_position_min}
        maxValue={tresholds.tube_molding_start_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.TUBE_MOLDING_END_POSITION_MIN}
        idMax={VarnishTresholdsParams.TUBE_MOLDING_END_POSITION_MAX}
        title={`${ParameterNames.VARNISH_TUBE_MOLDING_END_POSITION}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.tube_molding_end_position_min}
        maxValue={tresholds.tube_molding_end_position_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.POLIMERIZATION_FURNACE_TEMP_MIN}
        idMax={VarnishTresholdsParams.POLIMERIZATION_FURNACE_TEMP_MAX}
        title={`${ParameterNames.VARNISH_POLIMERIZATION_FURNACE_TEMP}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.polimerization_furnace_temp_min}
        maxValue={tresholds.polimerization_furnace_temp_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={VarnishTresholdsParams.INTERNAL_VARNISH_POROSITY_MIN}
        idMax={VarnishTresholdsParams.INTERNAL_VARNISH_POROSITY_MAX}
        title={`${ParameterNames.VARNISH_INTERNAL_VARNISH_POROSITY}: `}
        isInteger={true}
        required={true}
        fromZero={true}
        minValue={tresholds.internal_varnish_porosity_min}
        maxValue={tresholds.internal_varnish_porosity_max}
        onChange={changeTresholds}
      />
    </Stack>
  );
}
