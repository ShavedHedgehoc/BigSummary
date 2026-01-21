export class CreateSealantEntryDto {
  readonly id: number;
  readonly summary_id: number;
  readonly counter_value: number;
  readonly cap_machine_speed: number;
  readonly total_air_pressure: number;
  readonly holders_forward: number;
  readonly holders_opening_left: number;
  readonly holders_opening_right: number;
  readonly holders_closing: number;
  readonly injection_a_start: number;
  readonly injection_b_start: number;
  readonly injection_a_end: number;
  readonly injection_b_end: number;
  readonly injection_tube_orientation_start: number;
  readonly injection_tube_orientation_end: number;
  readonly is_cap_surface_smooth: boolean;
  readonly latex_ring_padding: number;
  readonly latex_ring_width: number;
  readonly tube_rigidity: number;
  readonly cap_unscrewing_torque: number;
  readonly employee_id: number;
}
