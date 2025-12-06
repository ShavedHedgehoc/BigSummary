import {
  ExtrusionOperation,
  ExtrusionStatus,
  OffsetOperation,
  OffsetParam,
  OffsetStatus,
  OffsetTreshold,
  Product,
  SealantOperation,
  SealantParam,
  SealantStatus,
  SealantTreshold,
  Summary,
  VarnishOperation,
  VarnishParam,
  VarnishStatus,
  VarnishTreshold,
} from "./../../generated/prisma/index.d";
import { Batch } from "./../../generated/prisma/index.d";
import { ExtrusionTreshold } from "./../../generated/prisma/index.d";
import { Rondel } from "./../../generated/prisma/index.d";
import { ExtrusionParam } from "./../../generated/prisma/index.d";

export interface IMappedSummary {
  id: number;
  batch_name: string;
  product_id: number;
  product_code: string;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  product_name: string;
  marking: string;
}

export interface IMappedExtrusionTresholds {
  id: number;
  product_id: number;
  press_speed_min: number;
  press_speed_max: number;
  blow_time_min: number;
  blow_time_max: number;
  turning_machine_speed_min: number;
  turning_machine_speed_max: number;
  annealing_furnace_temp_min: number;
  annealing_furnace_temp_max: number;
  rondel_id: number;
  tube_cilindrical_section_length_min: number;
  tube_cilindrical_section_length_max: number;
  membrane_thickness_min: number;
  membrane_thickness_max: number;
  tube_diameter_min: number;
  tube_diameter_max: number;
  tube_cilindrical_section_thickness_min: number;
  tube_cilindrical_section_thickness_max: number;
  tube_rigidity_min: number;
  tube_rigidity_max: number;
  external_thread_value: string;
  rondel: string;
  createdAt: Date;
}

export interface IMappedExtrusionParams {
  id: number;
  summary_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  rondel_id: number;
  tube_cilindrical_section_length: number;
  membrane_thickness: number;
  tube_diameter: number;
  tube_cilindrical_section_thickness: number;
  tube_rigidity: number;
  tube_cutting_quality: boolean;
  tightness: boolean;
  external_thread_quality: boolean;
  employee_id: number;
  createdAt: Date;
  rondel: string;
}

export interface IMappedVarnishParams {
  id: number;
  summary_id: number;
  counter_value: number;
  varnish_machine_speed: number;
  total_air_pressure: number;
  feed_can_air_pressure: number;
  nozzle_regulator_air_pressure: number;
  cells_speed: number;
  injection_a_start_position: number;
  injection_b_start_position: number;
  injection_c_start_position: number;
  injection_d_start_position: number;
  injection_a_end_position: number;
  injection_b_end_position: number;
  injection_c_end_position: number;
  injection_d_end_position: number;
  tube_molding_start_position: number;
  tube_molding_end_position: number;
  polimerization_furnace_temp: number;
  internal_varnish_porosity: number;
  internal_sectional_view: boolean;
  aluminium_clearance_lack: boolean;
  unpainting_lack: boolean;
  employee_id: number;
  createdAt: Date;
}

export interface IMappedVarnishTresholds {
  id: number;
  product_id: number;
  varnish_machine_speed_min: number;
  varnish_machine_speed_max: number;
  total_air_pressure_min: number;
  total_air_pressure_max: number;
  feed_can_air_pressure_min: number;
  feed_can_air_pressure_max: number;
  nozzle_regulator_air_pressure_min: number;
  nozzle_regulator_air_pressure_max: number;
  cells_speed_min: number;
  cells_speed_max: number;
  injection_a_start_position_min: number;
  injection_a_start_position_max: number;
  injection_b_start_position_min: number;
  injection_b_start_position_max: number;
  injection_c_start_position_min: number;
  injection_c_start_position_max: number;
  injection_d_start_position_min: number;
  injection_d_start_position_max: number;
  injection_a_end_position_min: number;
  injection_a_end_position_max: number;
  injection_b_end_position_min: number;
  injection_b_end_position_max: number;
  injection_c_end_position_min: number;
  injection_c_end_position_max: number;
  injection_d_end_position_min: number;
  injection_d_end_position_max: number;
  tube_molding_start_position_min: number;
  tube_molding_start_position_max: number;
  tube_molding_end_position_min: number;
  tube_molding_end_position_max: number;
  polimerization_furnace_temp_min: number;
  polimerization_furnace_temp_max: number;
  internal_varnish_porosity_min: number;
  internal_varnish_porosity_max: number;
  createdAt: Date;
}

export interface IMappedOffsetTresholds {
  id: number;
  product_id: number;
  printing_machine_speed_min: number;
  printing_machine_speed_max: number;
  total_air_pressure_min: number;
  total_air_pressure_max: number;
  padding_furnace_temp_min: number;
  padding_furnace_temp_max: number;
  offset_furnace_temp_min: number;
  offset_furnace_temp_max: number;
  printer_motor_min: number;
  printer_motor_max: number;
  base_covers_holders_motor_min: number;
  base_covers_holders_motor_max: number;
  base_covers_station_motor_min: number;
  base_covers_station_motor_max: number;
  imprint_quantity_printed_box_1_min: number | null;
  imprint_quantity_printed_box_1_max: number | null;
  imprint_quantity_printed_box_2_min: number | null;
  imprint_quantity_printed_box_2_max: number | null;
  imprint_quantity_printed_box_3_min: number | null;
  imprint_quantity_printed_box_3_max: number | null;
  imprint_quantity_printed_box_4_min: number | null;
  imprint_quantity_printed_box_4_max: number | null;
  imprint_quantity_printed_box_5_min: number | null;
  imprint_quantity_printed_box_5_max: number | null;
  imprint_quantity_printed_box_6_min: number | null;
  imprint_quantity_printed_box_6_max: number | null;
  ink_supply_time_min: number;
  ink_supply_time_max: number;
  createdAt: Date;
}

export interface IMappedOffsetParams {
  id: number;
  summary_id: number;
  counter_value: number;
  printing_machine_speed: number;
  total_air_pressure: number;
  padding_furnace_temp: number;
  offset_furnace_temp: number;
  printer_motor: number;
  base_covers_holders_motor: number;
  base_covers_station_motor: number;
  imprint_quantity_printed_box_1: number | null;
  imprint_quantity_printed_box_2: number | null;
  imprint_quantity_printed_box_3: number | null;
  imprint_quantity_printed_box_4: number | null;
  imprint_quantity_printed_box_5: number | null;
  imprint_quantity_printed_box_6: number | null;
  ink_supply_time: number;
  design_match: boolean;
  tube_apperarance: boolean;
  tube_edge_deformation_lack: boolean;
  aluminium_clearance_lack: boolean;
  drips_lack: boolean;
  employee_id: number;
  createdAt: Date;
}

export interface IMappedSealantParams {
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
  createdAt: Date;
}

export interface IMappedSealantTresholds {
  id: number;
  product_id: number;
  cap_machine_speed_min: number;
  cap_machine_speed_max: number;
  total_air_pressure_min: number;
  total_air_pressure_max: number;
  holders_forward_min: number;
  holders_forward_max: number;
  holders_opening_left_min: number;
  holders_opening_left_max: number;
  holders_opening_right_min: number;
  holders_opening_right_max: number;
  holders_closing_min: number;
  holders_closing_max: number;
  injection_a_start_min: number;
  injection_a_start_max: number;
  injection_b_start_min: number;
  injection_b_start_max: number;
  injection_a_end_min: number;
  injection_a_end_max: number;
  injection_b_end_min: number;
  injection_b_end_max: number;
  injection_tube_orientation_start_min: number;
  injection_tube_orientation_start_max: number;
  injection_tube_orientation_end_min: number;
  injection_tube_orientation_end_max: number;
  latex_ring_padding_min: number;
  latex_ring_padding_max: number;
  latex_ring_width_min: number;
  latex_ring_width_max: number;
  tube_rigidity_min: number;
  tube_rigidity_max: number;
  cap_unscrewing_torque_min: number;
  cap_unscrewing_torque_max: number;
  createdAt: Date;
}

export interface IMappedExtrusionCounters {
  counter_value: number;
  createdAt: Date;
}

export interface IMappedStatusCounters {
  counter_value: number;
  createdAt: Date;
  idle: boolean;
}

type state = "idle" | "working" | "finished";

export interface IMappedOperation {
  idle: Boolean;
  finished: Boolean;
  state: state;
  operation_description: String;
  createdAt: Date | null;
  operation_id: number | null;
}

export const mappedSummary = ({
  summary,
  batch,
  product,
}: {
  summary: Summary;
  batch: Batch;
  product: Product;
}): IMappedSummary => {
  return {
    id: summary.id,
    batch_name: batch.name,
    product_id: summary.product_id,
    product_code: product.code,
    product_name: product.name,
    marking: product.marking,
    batch_id: summary.batch_id,
    conveyor_id: summary.conveyor_id,
    plan: summary.plan,
    isActive: summary.isActive,
    isFinished: summary.isFinished,
  };
};

export const mappedExtrusionTreshold = ({
  tresholds,
  rondel,
}: {
  tresholds: ExtrusionTreshold | null;
  rondel: Rondel | null;
}): IMappedExtrusionTresholds | null => {
  if (!tresholds || !rondel) return null;
  return {
    id: tresholds.id,
    product_id: tresholds.product_id,
    press_speed_min: tresholds.press_speed_min,
    press_speed_max: tresholds.press_speed_max,
    blow_time_min: tresholds.blow_time_min,
    blow_time_max: tresholds.blow_time_max,
    turning_machine_speed_min: tresholds.turning_machine_speed_min,
    turning_machine_speed_max: tresholds.turning_machine_speed_max,
    annealing_furnace_temp_min: tresholds.annealing_furnace_temp_min,
    annealing_furnace_temp_max: tresholds.annealing_furnace_temp_max,
    rondel_id: tresholds.rondel_id,
    tube_cilindrical_section_length_min: tresholds.tube_cilindrical_section_length_min,
    tube_cilindrical_section_length_max: tresholds.tube_cilindrical_section_length_max,
    membrane_thickness_min: tresholds.membrane_thickness_min,
    membrane_thickness_max: tresholds.membrane_thickness_max,
    tube_diameter_min: tresholds.tube_diameter_min,
    tube_diameter_max: tresholds.tube_diameter_max,
    tube_cilindrical_section_thickness_min: tresholds.tube_cilindrical_section_thickness_min,
    tube_cilindrical_section_thickness_max: tresholds.tube_cilindrical_section_thickness_max,
    tube_rigidity_min: tresholds.tube_rigidity_min,
    tube_rigidity_max: tresholds.tube_rigidity_max,
    external_thread_value: tresholds.external_thread_value,
    rondel: rondel.value,
    createdAt: tresholds.createdAt,
  };
};

export function mappedExtrusionParams({
  params,
  rondel,
}: {
  params: ExtrusionParam | null;
  rondel: Rondel | null;
}): IMappedExtrusionParams | null {
  if (!params || !rondel) {
    return null;
  } else {
    return {
      id: params.id,
      summary_id: params.summary_id,
      counter_value: params.counter_value,
      press_speed: params.press_speed,
      blow_time: params.blow_time,
      turning_machine_speed: params.turning_machine_speed,
      annealing_furnace_temp: params.annealing_furnace_temp,
      rondel_id: rondel.id,
      tube_cilindrical_section_length: params.tube_cilindrical_section_length,
      membrane_thickness: params.membrane_thickness,
      tube_diameter: params.tube_diameter,
      tube_cilindrical_section_thickness: params.tube_cilindrical_section_thickness,
      tube_rigidity: params.tube_rigidity,
      tube_cutting_quality: params.tube_cutting_quality,
      tightness: params.tightness,
      external_thread_quality: params.external_thread_quality,
      employee_id: params.employee_id,
      createdAt: params.createdAt,
      rondel: rondel.value,
    };
  }
}

export function mappedVarnishParams({ params }: { params: VarnishParam | null }): IMappedVarnishParams | null {
  if (!params) {
    return null;
  } else {
    return {
      id: params.id,
      summary_id: params.summary_id,
      counter_value: params.counter_value,
      varnish_machine_speed: params.varnish_machine_speed,
      total_air_pressure: params.total_air_pressure,
      feed_can_air_pressure: params.feed_can_air_pressure,
      nozzle_regulator_air_pressure: params.nozzle_regulator_air_pressure,
      cells_speed: params.cells_speed,
      injection_a_start_position: params.injection_a_start_position,
      injection_b_start_position: params.injection_b_start_position,
      injection_c_start_position: params.injection_c_start_position,
      injection_d_start_position: params.injection_d_start_position,
      injection_a_end_position: params.injection_a_end_position,
      injection_b_end_position: params.injection_b_end_position,
      injection_c_end_position: params.injection_c_end_position,
      injection_d_end_position: params.injection_d_end_position,
      tube_molding_start_position: params.tube_molding_start_position,
      tube_molding_end_position: params.tube_molding_end_position,
      polimerization_furnace_temp: params.polimerization_furnace_temp,
      internal_varnish_porosity: params.internal_varnish_porosity,
      internal_sectional_view: params.internal_sectional_view,
      aluminium_clearance_lack: params.aluminium_clearance_lack,
      unpainting_lack: params.unpainting_lack,
      employee_id: params.employee_id,
      createdAt: params.createdAt,
    };
  }
}

export const mappedVarnishTresholds = ({
  tresholds,
}: {
  tresholds: VarnishTreshold | null;
}): IMappedVarnishTresholds | null => {
  if (!tresholds) return null;
  return {
    id: tresholds.id,
    product_id: tresholds.product_id,
    varnish_machine_speed_min: tresholds.varnish_machine_speed_min,
    varnish_machine_speed_max: tresholds.varnish_machine_speed_max,
    total_air_pressure_min: tresholds.total_air_pressure_min,
    total_air_pressure_max: tresholds.total_air_pressure_max,
    feed_can_air_pressure_min: tresholds.feed_can_air_pressure_min,
    feed_can_air_pressure_max: tresholds.feed_can_air_pressure_max,
    nozzle_regulator_air_pressure_min: tresholds.nozzle_regulator_air_pressure_min,
    nozzle_regulator_air_pressure_max: tresholds.nozzle_regulator_air_pressure_max,
    cells_speed_min: tresholds.cells_speed_min,
    cells_speed_max: tresholds.cells_speed_max,
    injection_a_start_position_min: tresholds.injection_a_start_position_min,
    injection_a_start_position_max: tresholds.injection_a_start_position_max,
    injection_b_start_position_min: tresholds.injection_b_start_position_min,
    injection_b_start_position_max: tresholds.injection_b_start_position_max,
    injection_c_start_position_min: tresholds.injection_c_start_position_min,
    injection_c_start_position_max: tresholds.injection_c_start_position_max,
    injection_d_start_position_min: tresholds.injection_d_start_position_min,
    injection_d_start_position_max: tresholds.injection_d_start_position_max,
    injection_a_end_position_min: tresholds.injection_a_end_position_min,
    injection_a_end_position_max: tresholds.injection_a_end_position_max,
    injection_b_end_position_min: tresholds.injection_b_end_position_min,
    injection_b_end_position_max: tresholds.injection_b_end_position_max,
    injection_c_end_position_min: tresholds.injection_c_end_position_min,
    injection_c_end_position_max: tresholds.injection_c_end_position_max,
    injection_d_end_position_min: tresholds.injection_d_end_position_min,
    injection_d_end_position_max: tresholds.injection_d_end_position_max,
    tube_molding_start_position_min: tresholds.tube_molding_start_position_min,
    tube_molding_start_position_max: tresholds.tube_molding_start_position_max,
    tube_molding_end_position_min: tresholds.tube_molding_end_position_min,
    tube_molding_end_position_max: tresholds.tube_molding_end_position_max,
    polimerization_furnace_temp_min: tresholds.polimerization_furnace_temp_min,
    polimerization_furnace_temp_max: tresholds.polimerization_furnace_temp_max,
    internal_varnish_porosity_min: tresholds.internal_varnish_porosity_min,
    internal_varnish_porosity_max: tresholds.internal_varnish_porosity_max,
    createdAt: tresholds.createdAt,
  };
};

export function mappedOffsetParams({ params }: { params: OffsetParam | null }): IMappedOffsetParams | null {
  if (!params) {
    return null;
  } else {
    return {
      id: params.id,
      summary_id: params.summary_id,
      counter_value: params.counter_value,
      printing_machine_speed: params.printing_machine_speed,
      total_air_pressure: params.total_air_pressure,
      padding_furnace_temp: params.padding_furnace_temp,
      offset_furnace_temp: params.offset_furnace_temp,
      printer_motor: params.printer_motor,
      base_covers_holders_motor: params.base_covers_holders_motor,
      base_covers_station_motor: params.base_covers_station_motor,
      imprint_quantity_printed_box_1: params.imprint_quantity_printed_box_1,
      imprint_quantity_printed_box_2: params.imprint_quantity_printed_box_2,
      imprint_quantity_printed_box_3: params.imprint_quantity_printed_box_3,
      imprint_quantity_printed_box_4: params.imprint_quantity_printed_box_4,
      imprint_quantity_printed_box_5: params.imprint_quantity_printed_box_5,
      imprint_quantity_printed_box_6: params.imprint_quantity_printed_box_6,
      ink_supply_time: params.ink_supply_time,
      design_match: params.design_match,
      tube_apperarance: params.tube_apperarance,
      tube_edge_deformation_lack: params.tube_edge_deformation_lack,
      aluminium_clearance_lack: params.aluminium_clearance_lack,
      drips_lack: params.drips_lack,
      employee_id: params.employee_id,
      createdAt: params.createdAt,
    };
  }
}

export const mappedOffsetTresholds = ({
  tresholds,
}: {
  tresholds: OffsetTreshold | null;
}): IMappedOffsetTresholds | null => {
  if (!tresholds) return null;
  return {
    id: tresholds.id,
    product_id: tresholds.product_id,
    printing_machine_speed_min: tresholds.printing_machine_speed_min,
    printing_machine_speed_max: tresholds.printing_machine_speed_max,
    total_air_pressure_min: tresholds.total_air_pressure_min,
    total_air_pressure_max: tresholds.total_air_pressure_max,
    padding_furnace_temp_min: tresholds.padding_furnace_temp_min,
    padding_furnace_temp_max: tresholds.padding_furnace_temp_max,
    offset_furnace_temp_min: tresholds.offset_furnace_temp_min,
    offset_furnace_temp_max: tresholds.offset_furnace_temp_max,
    printer_motor_min: tresholds.printer_motor_min,
    printer_motor_max: tresholds.printer_motor_max,
    base_covers_holders_motor_min: tresholds.base_covers_holders_motor_min,
    base_covers_holders_motor_max: tresholds.base_covers_holders_motor_max,
    base_covers_station_motor_min: tresholds.base_covers_station_motor_min,
    base_covers_station_motor_max: tresholds.base_covers_station_motor_max,
    imprint_quantity_printed_box_1_min: tresholds.imprint_quantity_printed_box_1_min ?? null,
    imprint_quantity_printed_box_1_max: tresholds.imprint_quantity_printed_box_1_max ?? null,
    imprint_quantity_printed_box_2_min: tresholds.imprint_quantity_printed_box_2_min ?? null,
    imprint_quantity_printed_box_2_max: tresholds.imprint_quantity_printed_box_2_max ?? null,
    imprint_quantity_printed_box_3_min: tresholds.imprint_quantity_printed_box_3_min ?? null,
    imprint_quantity_printed_box_3_max: tresholds.imprint_quantity_printed_box_3_max ?? null,
    imprint_quantity_printed_box_4_min: tresholds.imprint_quantity_printed_box_4_min ?? null,
    imprint_quantity_printed_box_4_max: tresholds.imprint_quantity_printed_box_4_max ?? null,
    imprint_quantity_printed_box_5_min: tresholds.imprint_quantity_printed_box_5_min ?? null,
    imprint_quantity_printed_box_5_max: tresholds.imprint_quantity_printed_box_5_max ?? null,
    imprint_quantity_printed_box_6_min: tresholds.imprint_quantity_printed_box_6_min ?? null,
    imprint_quantity_printed_box_6_max: tresholds.imprint_quantity_printed_box_6_max ?? null,
    ink_supply_time_min: tresholds.ink_supply_time_min,
    ink_supply_time_max: tresholds.ink_supply_time_max,
    createdAt: tresholds.createdAt,
  };
};

export function mappedSealantParams({ params }: { params: SealantParam | null }): IMappedSealantParams | null {
  if (!params) {
    return null;
  } else {
    return {
      id: params.id,
      summary_id: params.summary_id,
      counter_value: params.counter_value,
      cap_machine_speed: params.cap_machine_speed,
      total_air_pressure: params.total_air_pressure,
      holders_forward: params.holders_forward,
      holders_opening_left: params.holders_opening_left,
      holders_opening_right: params.holders_opening_right,
      holders_closing: params.holders_closing,
      injection_a_start: params.injection_a_start,
      injection_b_start: params.injection_b_start,
      injection_a_end: params.injection_a_end,
      injection_b_end: params.injection_b_end,
      injection_tube_orientation_start: params.injection_tube_orientation_start,
      injection_tube_orientation_end: params.injection_tube_orientation_end,
      is_cap_surface_smooth: params.is_cap_surface_smooth,
      latex_ring_padding: params.latex_ring_padding,
      latex_ring_width: params.latex_ring_width,
      tube_rigidity: params.tube_rigidity,
      cap_unscrewing_torque: params.cap_unscrewing_torque,
      employee_id: params.employee_id,
      createdAt: params.createdAt,
    };
  }
}

export const mappedSealantTresholds = ({
  tresholds,
}: {
  tresholds: SealantTreshold | null;
}): IMappedSealantTresholds | null => {
  if (!tresholds) return null;
  return {
    id: tresholds.id,
    product_id: tresholds.product_id,
    cap_machine_speed_min: tresholds.cap_machine_speed_min,
    cap_machine_speed_max: tresholds.cap_machine_speed_max,
    total_air_pressure_min: tresholds.total_air_pressure_min,
    total_air_pressure_max: tresholds.total_air_pressure_max,
    holders_forward_min: tresholds.holders_forward_min,
    holders_forward_max: tresholds.holders_forward_max,
    holders_opening_left_min: tresholds.holders_opening_left_min,
    holders_opening_left_max: tresholds.holders_opening_left_max,
    holders_opening_right_min: tresholds.holders_opening_right_min,
    holders_opening_right_max: tresholds.holders_opening_right_max,
    holders_closing_min: tresholds.holders_closing_min,
    holders_closing_max: tresholds.holders_closing_max,
    injection_a_start_min: tresholds.injection_a_start_min,
    injection_a_start_max: tresholds.injection_a_start_max,
    injection_b_start_min: tresholds.injection_b_start_min,
    injection_b_start_max: tresholds.injection_b_start_max,
    injection_a_end_min: tresholds.injection_a_end_min,
    injection_a_end_max: tresholds.injection_a_end_max,
    injection_b_end_min: tresholds.injection_b_end_min,
    injection_b_end_max: tresholds.injection_b_end_max,
    injection_tube_orientation_start_min: tresholds.injection_tube_orientation_start_min,
    injection_tube_orientation_start_max: tresholds.injection_tube_orientation_start_max,
    injection_tube_orientation_end_min: tresholds.injection_tube_orientation_end_min,
    injection_tube_orientation_end_max: tresholds.injection_tube_orientation_end_max,
    latex_ring_padding_min: tresholds.latex_ring_padding_min,
    latex_ring_padding_max: tresholds.latex_ring_padding_max,
    latex_ring_width_min: tresholds.latex_ring_width_min,
    latex_ring_width_max: tresholds.latex_ring_width_max,
    tube_rigidity_min: tresholds.tube_rigidity_min,
    tube_rigidity_max: tresholds.tube_rigidity_max,
    cap_unscrewing_torque_min: tresholds.cap_unscrewing_torque_min,
    cap_unscrewing_torque_max: tresholds.cap_unscrewing_torque_max,
    createdAt: tresholds.createdAt,
  };
};

// export const mappedCounters = (
//   params: ExtrusionParam[] | OffsetParam[] | VarnishParam[] | SealantParam[] | null
// ): IMappedExtrusionCounters[] | [] => {
//   if (!params) return [];
//   return params
//     .sort((a, b) => a.id - b.id)
//     .map((item) => ({ counter_value: item.counter_value, createdAt: item.createdAt }));
// };

export const mappedStatusCounters = (
  statuses: ExtrusionStatus[] | VarnishStatus[] | OffsetStatus[] | SealantStatus[] | null
): IMappedStatusCounters[] | [] => {
  if (!statuses) return [];
  return statuses
    .sort((a, b) => a.id - b.id)
    .map((item) => ({ counter_value: item.counter_value, createdAt: item.createdAt, idle: item.idle }));
};

export const mappedStatus = ({
  status,
  operation,
}: {
  status: ExtrusionStatus | SealantStatus | VarnishStatus | OffsetStatus | null;
  operation: ExtrusionOperation | VarnishOperation | OffsetOperation | SealantOperation | null;
}): IMappedOperation => {
  if (!status)
    return {
      idle: false,
      finished: false,
      state: "working",
      operation_description: "-",
      createdAt: null,
      operation_id: null,
    };

  return {
    idle: status.idle,
    finished: status.finished,
    state: status.finished === true ? "finished" : status.idle === true ? "idle" : "working",
    createdAt: status.createdAt,
    operation_description: operation ? operation.description : "-",
    operation_id: operation ? operation.id : null,
  };
};

export const mappedOperations = () => {
  return [];
};
