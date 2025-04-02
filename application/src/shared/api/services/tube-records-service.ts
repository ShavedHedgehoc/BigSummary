import { $api } from "../http";

export interface IXLSXTubeRecordRowData {
  code1C: string;
  serie: string;
  product_marking: string;
  product_name: string;
  batch: string;
  plan: string;
  conveyor: string;
  assembly: string;
  press_speed_min: string;
  press_speed_max: string;
  molding_time_min: string;
  molding_time_max: string;
  turning_automate_speed_min: string;
  turning_automate_speed_max: string;
  annealing_furnace_temp_min: string;
  annealing_furnace_temp_max: string;
  cap_machine_speed_min: string;
  cap_machine_speed_max: string;
  cap_machine_air_pressure_min: string;
  cap_machine_air_pressure_max: string;
  grips_forward_min: string;
  grips_forward_max: string;
  grips_opening_left_min: string;
  grips_opening_left_max: string;
  grips_opening_right_min: string;
  grips_opening_right_max: string;
  grips_closing_min: string;
  grips_closing_max: string;
  injection_start_min: string;
  injection_start_max: string;
  injection_end_min: string;
  injection_end_max: string;
  tube_start_position_min: string;
  tube_start_position_max: string;
  tube_end_position_min: string;
  tube_end_position_max: string;
  padding_machine_speed_min: string;
  padding_machine_speed_max: string;
  padding_machine_air_pressure_min: string;
  padding_machine_air_pressure_max: string;
  padding_furnace_temp_min: string;
  padding_furnace_temp_max: string;
  offset_furnace_temp_min: string;
  offset_furnace_temp_max: string;
  printer_motor_speed_min: string;
  printer_motor_speed_max: string;
  holders_motor_speed_min: string;
  holders_motor_speed_max: string;
  station_motor_speed_min: string;
  station_motor_speed_max: string;
  ink_injection_time_min: string;
  ink_injection_time_max: string;
  lacquer_machine_speed_min: string;
  lacquer_machine_speed_max: string;
  lacquer_machine_air_pressure_min: string;
  lacquer_machine_air_pressure_max: string;
  feed_can_air_pressure_min: string;
  feed_can_air_pressure_max: string;
  nozzle_regulator_air_pressure_min: string;
  nozzle_regulator_air_pressure_max: string;
  cells_speed_min: string;
  cells_speed_max: string;
  injection_AB_start_position_min: string;
  injection_AB_start_position_max: string;
  injection_CD_start_position_min: string;
  injection_CD_start_position_max: string;
  injection_ABCD_end_position_min: string;
  injection_ABCD_end_position_max: string;
  tube_molding_start_position_min: string;
  tube_molding_start_position_max: string;
  tube_molding_end_position_min: string;
  tube_molding_end_position_max: string;
  polimerization_furnace_temperature_min: string;
  polimerization_furnace_temperature_max: string;
}

export interface ITubeRecordsUploadData {
  summaryDate: string;
  update: boolean;
  rows: IXLSXTubeRecordRowData[];
}

export default class TubeRecordsService {
  static async bulkCreateTubeRecords(dto: ITubeRecordsUploadData) {
    const res = await $api.post(`/tube-records/upload`, dto);
    return res.data;
  }
}
