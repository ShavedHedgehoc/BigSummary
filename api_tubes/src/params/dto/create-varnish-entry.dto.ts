export class CreateVarnishEntryDto {
  readonly id: number;
  readonly summary_id: number;
  readonly counter_value: number;
  readonly varnish_machine_speed: number;
  readonly total_air_pressure: number;
  readonly feed_can_air_pressure: number;
  readonly nozzle_regulator_air_pressure: number;
  readonly cells_speed: number;
  readonly injection_a_start_position: number;
  readonly injection_b_start_position: number;
  readonly injection_c_start_position: number;
  readonly injection_d_start_position: number;
  readonly injection_a_end_position: number;
  readonly injection_b_end_position: number;
  readonly injection_c_end_position: number;
  readonly injection_d_end_position: number;
  readonly tube_molding_start_position: number;
  readonly tube_molding_end_position: number;
  readonly polimerization_furnace_temp: number;
  readonly internal_varnish_porosity: number;
  readonly internal_sectional_view: boolean;
  readonly aluminium_clearance_lack: boolean;
  readonly unpainting_lack: boolean;
  readonly employee_id: number;
}
