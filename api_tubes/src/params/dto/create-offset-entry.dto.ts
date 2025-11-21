export class CreateOffsetEntryDto {
  readonly summary_id: number;
  readonly employee_id: number;
  readonly counter_value: number;
  readonly printing_machine_speed: number;
  readonly total_air_pressure: number;
  readonly padding_furnace_temp: number;
  readonly offset_furnace_temp: number;
  readonly printer_motor: number;
  readonly base_covers_holders_motor: number;
  readonly base_covers_station_motor: number;
  readonly imprint_quantity_printed_box_1: number | null;
  readonly imprint_quantity_printed_box_2: number | null;
  readonly imprint_quantity_printed_box_3: number | null;
  readonly imprint_quantity_printed_box_4: number | null;
  readonly imprint_quantity_printed_box_5: number | null;
  readonly imprint_quantity_printed_box_6: number | null;
  readonly ink_supply_time: number;
  readonly design_match: boolean;
  readonly tube_apperarance: boolean;
  readonly tube_edge_deformation_lack: boolean;
  readonly aluminium_clearance_lack: boolean;
  readonly drips_lack: boolean;
}
