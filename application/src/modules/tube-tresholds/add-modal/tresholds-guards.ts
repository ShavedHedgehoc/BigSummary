import {
  IExtrusionTreshold,
  IOffsetTreshold,
  ISealantTreshold,
  IVarnishTreshold,
} from "../../../shared/api/services/tube-tresholds-service";

export function isExtrusionTreshold(
  obj: IExtrusionTreshold | IVarnishTreshold | IOffsetTreshold | ISealantTreshold
): obj is IExtrusionTreshold {
  return (
    "id" in obj &&
    "product_id" in obj &&
    "conveyor_id" in obj &&
    "press_speed_min" in obj &&
    "press_speed_max" in obj &&
    "blow_time_min" in obj &&
    "blow_time_max" in obj &&
    "turning_machine_speed_min" in obj &&
    "turning_machine_speed_max" in obj &&
    "annealing_furnace_temp_min" in obj &&
    "annealing_furnace_temp_max" in obj &&
    "rondel_id" in obj &&
    "tube_cilindrical_section_length_min" in obj &&
    "tube_cilindrical_section_length_max" in obj &&
    "membrane_thickness_min" in obj &&
    "membrane_thickness_max" in obj &&
    "tube_diameter_min" in obj &&
    "tube_diameter_max" in obj &&
    "tube_cilindrical_section_thickness_min" in obj &&
    "tube_cilindrical_section_thickness_max" in obj &&
    "tube_rigidity_min" in obj &&
    "tube_rigidity_max" in obj &&
    "external_thread_value" in obj &&
    "createdAt" in obj
  );
}

export function isVarnishTreshold(
  obj: IExtrusionTreshold | IVarnishTreshold | IOffsetTreshold | ISealantTreshold
): obj is IVarnishTreshold {
  return (
    "id" in obj &&
    "product_id" in obj &&
    "conveyor_id" in obj &&
    "varnish_machine_speed_min" in obj &&
    "varnish_machine_speed_max" in obj &&
    "total_air_pressure_min" in obj &&
    "total_air_pressure_max" in obj &&
    "feed_can_air_pressure_min" in obj &&
    "feed_can_air_pressure_max" in obj &&
    "nozzle_regulator_air_pressure_min" in obj &&
    "nozzle_regulator_air_pressure_max" in obj &&
    "cells_speed_min" in obj &&
    "cells_speed_max" in obj &&
    "injection_a_start_position_min" in obj &&
    "injection_a_start_position_max" in obj &&
    "injection_b_start_position_min" in obj &&
    "injection_b_start_position_max" in obj &&
    "injection_c_start_position_min" in obj &&
    "injection_c_start_position_max" in obj &&
    "injection_d_start_position_min" in obj &&
    "injection_d_start_position_max" in obj &&
    "injection_a_end_position_min" in obj &&
    "injection_a_end_position_max" in obj &&
    "injection_b_end_position_min" in obj &&
    "injection_b_end_position_max" in obj &&
    "injection_c_end_position_min" in obj &&
    "injection_c_end_position_max" in obj &&
    "injection_d_end_position_min" in obj &&
    "injection_d_end_position_max" in obj &&
    "tube_molding_start_position_min" in obj &&
    "tube_molding_start_position_max" in obj &&
    "tube_molding_end_position_min" in obj &&
    "tube_molding_end_position_max" in obj &&
    "polimerization_furnace_temp_min" in obj &&
    "polimerization_furnace_temp_max" in obj &&
    "internal_varnish_porosity_min" in obj &&
    "internal_varnish_porosity_max" in obj &&
    "createdAt" in obj
  );
}

export function isOffsetTreshold(
  obj: IExtrusionTreshold | IVarnishTreshold | IOffsetTreshold | ISealantTreshold
): obj is IOffsetTreshold {
  return (
    "id" in obj &&
    "product_id" in obj &&
    "conveyor_id" in obj &&
    "printing_machine_speed_min" in obj &&
    "printing_machine_speed_max" in obj &&
    "total_air_pressure_min" in obj &&
    "total_air_pressure_max" in obj &&
    "padding_furnace_temp_min" in obj &&
    "padding_furnace_temp_max" in obj &&
    "offset_furnace_temp_min" in obj &&
    "offset_furnace_temp_max" in obj &&
    "printer_motor_min" in obj &&
    "printer_motor_max" in obj &&
    "base_covers_holders_motor_min" in obj &&
    "base_covers_holders_motor_max" in obj &&
    "base_covers_station_motor_min" in obj &&
    "base_covers_station_motor_max" in obj &&
    "imprint_quantity_printed_box_1_min" in obj &&
    "imprint_quantity_printed_box_1_max" in obj &&
    "imprint_quantity_printed_box_2_min" in obj &&
    "imprint_quantity_printed_box_2_max" in obj &&
    "imprint_quantity_printed_box_3_min" in obj &&
    "imprint_quantity_printed_box_3_max" in obj &&
    "imprint_quantity_printed_box_4_min" in obj &&
    "imprint_quantity_printed_box_4_max" in obj &&
    "imprint_quantity_printed_box_5_min" in obj &&
    "imprint_quantity_printed_box_5_max" in obj &&
    "imprint_quantity_printed_box_6_min" in obj &&
    "imprint_quantity_printed_box_6_max" in obj &&
    "ink_supply_time_min" in obj &&
    "ink_supply_time_max" in obj &&
    "createdAt" in obj
  );
}

export function isSealantTreshold(
  obj: IExtrusionTreshold | IVarnishTreshold | IOffsetTreshold | ISealantTreshold
): obj is ISealantTreshold {
  return (
    "id" in obj &&
    "product_id" in obj &&
    "conveyor_id" in obj &&
    "cap_machine_speed_min" in obj &&
    "cap_machine_speed_max" in obj &&
    "total_air_pressure_min" in obj &&
    "total_air_pressure_max" in obj &&
    "holders_forward_min" in obj &&
    "holders_forward_max" in obj &&
    "holders_opening_left_min" in obj &&
    "holders_opening_left_max" in obj &&
    "holders_opening_right_min" in obj &&
    "holders_opening_right_max" in obj &&
    "holders_closing_min" in obj &&
    "holders_closing_max" in obj &&
    "injection_a_start_min" in obj &&
    "injection_a_start_max" in obj &&
    "injection_b_start_min" in obj &&
    "injection_b_start_max" in obj &&
    "injection_a_end_min" in obj &&
    "injection_a_end_max" in obj &&
    "injection_b_end_min" in obj &&
    "injection_b_end_max" in obj &&
    "injection_tube_orientation_start_min" in obj &&
    "injection_tube_orientation_start_max" in obj &&
    "injection_tube_orientation_end_min" in obj &&
    "injection_tube_orientation_end_max" in obj &&
    "latex_ring_padding_min" in obj &&
    "latex_ring_padding_max" in obj &&
    "latex_ring_width_min" in obj &&
    "latex_ring_width_max" in obj &&
    "tube_rigidity_min" in obj &&
    "tube_rigidity_max" in obj &&
    "cap_unscrewing_torque_min" in obj &&
    "cap_unscrewing_torque_max" in obj &&
    "createdAt" in obj
  );
}
