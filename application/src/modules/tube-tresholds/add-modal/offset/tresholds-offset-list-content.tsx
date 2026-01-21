import { Stack } from "@mui/joy";
import { TresholdsMinMaxEntry } from "../shared/tresholds-min-max-entry";
import { ParameterNames } from "../shared/parameter-names";
import { OffsetTresholdsParams } from "../store/use-tube-offset-tresholds-store";
import { useOffsetTresholds } from "./use-offset-tresholds";

export default function TresholdsOffsetListContent() {
  const { tresholds, changeTresholds } = useOffsetTresholds();

  return (
    <Stack spacing={2}>
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.PRINTING_MACHINE_SPEED_MIN}
        idMax={OffsetTresholdsParams.PRINTING_MACHINE_SPEED_MAX}
        title={`${ParameterNames.OFFSET_PRINTING_MACHINE_SPEED}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.printing_machine_speed_min}
        maxValue={tresholds.printing_machine_speed_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.TOTAL_AIR_PRESSURE_MIN}
        idMax={OffsetTresholdsParams.TOTAL_AIR_PRESSURE_MAX}
        title={`${ParameterNames.OFFSET_TOTAL_AIR_PRESSURE}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.total_air_pressure_min}
        maxValue={tresholds.total_air_pressure_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.PADDING_FURNACE_TEMP_MIN}
        idMax={OffsetTresholdsParams.PADDING_FURNACE_TEMP_MAX}
        title={`${ParameterNames.OFFSET_PADDING_FURNACE_TEMP}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.padding_furnace_temp_min}
        maxValue={tresholds.padding_furnace_temp_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.OFFSET_FURNACE_TEMP_MIN}
        idMax={OffsetTresholdsParams.OFFSET_FURNACE_TEMP_MAX}
        title={`${ParameterNames.OFFSET_OFFSET_FURNACE_TEMP}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.offset_furnace_temp_min}
        maxValue={tresholds.offset_furnace_temp_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.PRINTER_MOTOR_MIN}
        idMax={OffsetTresholdsParams.PRINTER_MOTOR_MAX}
        title={`${ParameterNames.OFFSET_PRINTER_MOTOR}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.printer_motor_min}
        maxValue={tresholds.printer_motor_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.BASE_COVERS_HOLDERS_MOTOR_MIN}
        idMax={OffsetTresholdsParams.BASE_COVERS_HOLDERS_MOTOR_MAX}
        title={`${ParameterNames.OFFSET_BASE_COVERS_HOLDERS_MOTOR}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.base_covers_holders_motor_min}
        maxValue={tresholds.base_covers_holders_motor_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.BASE_COVERS_STATION_MOTOR_MIN}
        idMax={OffsetTresholdsParams.BASE_COVERS_STATION_MOTOR_MAX}
        title={`${ParameterNames.OFFSET_BASE_COVERS_STATION_MOTOR}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.base_covers_station_motor_min}
        maxValue={tresholds.base_covers_station_motor_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_1_MIN}
        idMax={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_1_MAX}
        title={`${ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_1}: `}
        isInteger={true}
        required={false}
        minValue={tresholds.imprint_quantity_printed_box_1_min}
        maxValue={tresholds.imprint_quantity_printed_box_1_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_2_MIN}
        idMax={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_2_MAX}
        title={`${ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_2}: `}
        isInteger={true}
        required={false}
        minValue={tresholds.imprint_quantity_printed_box_2_min}
        maxValue={tresholds.imprint_quantity_printed_box_2_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_3_MIN}
        idMax={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_3_MAX}
        title={`${ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_3}: `}
        isInteger={true}
        required={false}
        minValue={tresholds.imprint_quantity_printed_box_3_min}
        maxValue={tresholds.imprint_quantity_printed_box_3_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_4_MIN}
        idMax={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_4_MAX}
        title={`${ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_4}: `}
        isInteger={true}
        required={false}
        minValue={tresholds.imprint_quantity_printed_box_4_min}
        maxValue={tresholds.imprint_quantity_printed_box_4_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_5_MIN}
        idMax={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_5_MAX}
        title={`${ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_5}: `}
        isInteger={true}
        required={false}
        minValue={tresholds.imprint_quantity_printed_box_5_min}
        maxValue={tresholds.imprint_quantity_printed_box_5_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_6_MIN}
        idMax={OffsetTresholdsParams.IMPRINT_QUANTITY_PRINTED_BOX_6_MAX}
        title={`${ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_6}: `}
        isInteger={true}
        required={false}
        minValue={tresholds.imprint_quantity_printed_box_6_min}
        maxValue={tresholds.imprint_quantity_printed_box_6_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={OffsetTresholdsParams.INK_SUPPLY_TIME_MIN}
        idMax={OffsetTresholdsParams.INK_SUPPLY_TIME_MAX}
        title={`${ParameterNames.OFFSET_INK_SUPPLY_TIME}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.ink_supply_time_min}
        maxValue={tresholds.ink_supply_time_max}
        onChange={changeTresholds}
      />
    </Stack>
  );
}
