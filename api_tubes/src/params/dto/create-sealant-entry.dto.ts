export class CreateSealantEntryDto {
  id: number;
  summary_id: number;
  counter_value: number;
  cap_machine_speed: number;
  total_air_pressure: number;
  holders_forward: number;
  holders_opening_left: number;
  holders_opening_right: number;
  holders_closing: number;
  injection_a_start: number;
  injection_b_start: number;
  injection_a_end: number;
  injection_b_end: number;
  injection_tube_orientation_start: number;
  injection_tube_orientation_end: number;
  is_cap_surface_smooth: boolean;
  latex_ring_padding: number;
  latex_ring_width: number;
  tube_rigidity: number;
  cap_unscrewing_torque: number;
  employee_id: number;
}
