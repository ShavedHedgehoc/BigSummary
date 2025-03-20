import axios from "axios";

export interface IParameter {
  id: number;
  tube_record_id: number;
  press_speed_min: number;
  press_speed_max: number;
  molding_time_min: number;
  molding_time_max: number;
  turning_automate_speed_min: number;
  turning_automate_speed_max: number;
  annealing_furnace_temp_min: number;
  annealing_furnace_temp_max: number;
  cap_machine_speed_min: number;
  cap_machine_speed_max: number;
  caps_machine_air_pressure_min: number;
  caps_machine_air_pressure_max: number;
  grips_forward_min: number;
  grips_forward_max: number;
  grips_opening_left_min: number;
  grips_opening_left_max: number;
  grips_opening_right_min: number;
  grips_opening_right_max: number;
  grips_closing_min: number;
  grips_closing_max: number;
  injection_start_min: number;
  injection_start_max: number;
  injection_end_min: number;
  injection_end_max: number;
  tube_start_position_min: number;
  tube_start_position_max: number;
  tube_end_position_min: number;
  tube_end_position_max: number;
  padding_machine_speed_min: number;
  padding_machine_speed_max: number;
  padding_machine_air_pressure_min: number;
  padding_machine_air_pressure_max: number;
  padding_furnace_temp_min: number;
  padding_furnace_temp_max: number;
  offset_furnace_temp_min: number;
  offset_furnace_temp_max: number;
  printer_motor_speed_min: number;
  printer_motor_speed_max: number;
  holders_motor_speed_min: number;
  holders_motor_speed_max: number;
  station_motor_speed_min: number;
  station_motor_speed_max: number;
  ink_injection_time_min: number;
  ink_injection_time_max: number;
  lacquer_machine_speed_min: number;
  lacquer_machine_speed_max: number;
  lacquer_machine_air_pressure_min: number;
  lacquer_machine_air_pressure_max: number;
  feed_can_air_pressure_min: number;
  feed_can_air_pressure_max: number;
  nozzle_regulator_air_pressure_min: number;
  nozzle_regulator_air_pressure_max: number;
  cells_speed_min: number;
  cells_speed_max: number;
  injection_start_position_min: number;
  injection_start_position_max: number;
  injection_end_position_min: number;
  injection_end_position_max: number;
  tube_molding_start_position_min: number;
  tube_molding_start_position_max: number;
  tube_molding_end_position_min: number;
  tube_molding_end_position_max: number;
  polimerrization_furnace_temperature_min: number;
  polimerrization_furnace_temperature_max: number;
}

export default class ParameterService {
  static async getParametersByRecId(recordId: number | null): Promise<IParameter> {
    const res = await axios.get(`/api/tube-parameters/${recordId}`);
    return res.data;
  }
}
