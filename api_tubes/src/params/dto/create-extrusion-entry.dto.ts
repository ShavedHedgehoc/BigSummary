export class CreateExtrusionEntryDto {
  readonly summary_id: number;
  readonly employee_id: number;
  readonly counter_value: number;
  readonly press_speed: number;
  readonly blow_time: number;
  readonly turning_machine_speed: number;
  readonly annealing_furnace_temp: number;
  readonly rondel_id: number;
  readonly tube_cilindrical_section_length: number;
  readonly membrane_thickness: number;
  readonly tube_diameter: number;
  readonly tube_cilindrical_section_thickness: number;
  readonly tube_rigidity: number;
  readonly tube_cutting_quality: boolean;
  readonly tightness: boolean;
  readonly external_thread_quality: boolean;
}
