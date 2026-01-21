import { $apiTubes } from "../http";

export interface IExtrusionTreshold {
  id: number;
  product_id: number | null;
  conveyor_id: number | null;
  press_speed_min: string;
  press_speed_max: string;
  blow_time_min: string;
  blow_time_max: string;
  turning_machine_speed_min: string;
  turning_machine_speed_max: string;
  annealing_furnace_temp_min: string;
  annealing_furnace_temp_max: string;
  rondel_id: number | null;
  tube_cilindrical_section_length_min: string;
  tube_cilindrical_section_length_max: string;
  membrane_thickness_min: string;
  membrane_thickness_max: string;
  tube_diameter_min: string;
  tube_diameter_max: string;
  tube_cilindrical_section_thickness_min: string;
  tube_cilindrical_section_thickness_max: string;
  tube_rigidity_min: string;
  tube_rigidity_max: string;
  external_thread_value: string;
  createdAt: Date;
}

export interface IVarnishTreshold {
  id: number;
  product_id: number | null;
  conveyor_id: number | null;
  varnish_machine_speed_min: string;
  varnish_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  feed_can_air_pressure_min: string;
  feed_can_air_pressure_max: string;
  nozzle_regulator_air_pressure_min: string;
  nozzle_regulator_air_pressure_max: string;
  cells_speed_min: string;
  cells_speed_max: string;
  injection_a_start_position_min: string;
  injection_a_start_position_max: string;
  injection_b_start_position_min: string;
  injection_b_start_position_max: string;
  injection_c_start_position_min: string;
  injection_c_start_position_max: string;
  injection_d_start_position_min: string;
  injection_d_start_position_max: string;
  injection_a_end_position_min: string;
  injection_a_end_position_max: string;
  injection_b_end_position_min: string;
  injection_b_end_position_max: string;
  injection_c_end_position_min: string;
  injection_c_end_position_max: string;
  injection_d_end_position_min: string;
  injection_d_end_position_max: string;
  tube_molding_start_position_min: string;
  tube_molding_start_position_max: string;
  tube_molding_end_position_min: string;
  tube_molding_end_position_max: string;
  polimerization_furnace_temp_min: string;
  polimerization_furnace_temp_max: string;
  internal_varnish_porosity_min: string;
  internal_varnish_porosity_max: string;
  createdAt: Date;
}

export interface IOffsetTreshold {
  id: number;
  product_id: number | null;
  conveyor_id: number | null;
  printing_machine_speed_min: string;
  printing_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  padding_furnace_temp_min: string;
  padding_furnace_temp_max: string;
  offset_furnace_temp_min: string;
  offset_furnace_temp_max: string;
  printer_motor_min: string;
  printer_motor_max: string;
  base_covers_holders_motor_min: string;
  base_covers_holders_motor_max: string;
  base_covers_station_motor_min: string;
  base_covers_station_motor_max: string;
  imprint_quantity_printed_box_1_min: string | null;
  imprint_quantity_printed_box_1_max: string | null;
  imprint_quantity_printed_box_2_min: string | null;
  imprint_quantity_printed_box_2_max: string | null;
  imprint_quantity_printed_box_3_min: string | null;
  imprint_quantity_printed_box_3_max: string | null;
  imprint_quantity_printed_box_4_min: string | null;
  imprint_quantity_printed_box_4_max: string | null;
  imprint_quantity_printed_box_5_min: string | null;
  imprint_quantity_printed_box_5_max: string | null;
  imprint_quantity_printed_box_6_min: string | null;
  imprint_quantity_printed_box_6_max: string | null;
  ink_supply_time_min: string;
  ink_supply_time_max: string;
  createdAt: Date;
}

export interface ISealantTreshold {
  id: number;
  product_id: number | null;
  conveyor_id: number | null;
  cap_machine_speed_min: string;
  cap_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  holders_forward_min: string;
  holders_forward_max: string;
  holders_opening_left_min: string;
  holders_opening_left_max: string;
  holders_opening_right_min: string;
  holders_opening_right_max: string;
  holders_closing_min: string;
  holders_closing_max: string;
  injection_a_start_min: string;
  injection_a_start_max: string;
  injection_b_start_min: string;
  injection_b_start_max: string;
  injection_a_end_min: string;
  injection_a_end_max: string;
  injection_b_end_min: string;
  injection_b_end_max: string;
  injection_tube_orientation_start_min: string;
  injection_tube_orientation_start_max: string;
  injection_tube_orientation_end_min: string;
  injection_tube_orientation_end_max: string;
  latex_ring_padding_min: string;
  latex_ring_padding_max: string;
  latex_ring_width_min: string;
  latex_ring_width_max: string;
  tube_rigidity_min: string;
  tube_rigidity_max: string;
  cap_unscrewing_torque_min: string;
  cap_unscrewing_torque_max: string;
  createdAt: Date;
}

export interface ITubeExtrusionTresholdRow {
  product_id: number;
  product_code: string;
  product_name: string;
  product_marking: string;
  conveyor_id: number;
  conveyor_name: string;
  count: number;
  last: IExtrusionTreshold | null;
}
export interface ITubeVarnishTresholdRow {
  product_id: number;
  product_code: string;
  product_name: string;
  product_marking: string;
  conveyor_id: number;
  conveyor_name: string;
  count: number;
  last: IVarnishTreshold | null;
}
export interface ITubeOffsetTresholdRow {
  product_id: number;
  product_code: string;
  product_name: string;
  product_marking: string;
  conveyor_id: number;
  conveyor_name: string;
  count: number;
  last: IOffsetTreshold | null;
}
export interface ITubeSealantTresholdRow {
  product_id: number;
  product_code: string;
  product_name: string;
  product_marking: string;
  conveyor_id: number;
  conveyor_name: string;
  count: number;
  last: ISealantTreshold | null;
}

export interface TubeExtrusionTresholdResponse {
  rows: ITubeExtrusionTresholdRow[] | [];
  total: number;
}

export interface TubeVarnishTresholdResponse {
  rows: ITubeVarnishTresholdRow[] | [];
  total: number;
}

export interface TubeOffsetTresholdResponse {
  rows: ITubeOffsetTresholdRow[] | [];
  total: number;
}

export interface TubeSealantTresholdResponse {
  rows: ITubeSealantTresholdRow[] | [];
  total: number;
}

export interface FetchTubeTresholdsFilter {
  code: string;
  marking: string;
  empty: number[] | [];
  conveyors: number[] | [];
}

export interface FetchTubeTresholdsDto {
  filter: FetchTubeTresholdsFilter;
  page: number;
  limit: number;
}

export interface CreateExtrusionTresholdDto {
  product_id: number | null;
  conveyor_id: number | null;
  press_speed_min: string;
  press_speed_max: string;
  blow_time_min: string;
  blow_time_max: string;
  turning_machine_speed_min: string;
  turning_machine_speed_max: string;
  annealing_furnace_temp_min: string;
  annealing_furnace_temp_max: string;
  rondel_id: number | null;
  tube_cilindrical_section_length_min: string;
  tube_cilindrical_section_length_max: string;
  membrane_thickness_min: string;
  membrane_thickness_max: string;
  tube_diameter_min: string;
  tube_diameter_max: string;
  tube_cilindrical_section_thickness_min: string;
  tube_cilindrical_section_thickness_max: string;
  tube_rigidity_min: string;
  tube_rigidity_max: string;
  external_thread_value: string;
}

export interface CreateVarnishTresholdDto {
  product_id: number | null;
  conveyor_id: number | null;
  varnish_machine_speed_min: string;
  varnish_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  feed_can_air_pressure_min: string;
  feed_can_air_pressure_max: string;
  nozzle_regulator_air_pressure_min: string;
  nozzle_regulator_air_pressure_max: string;
  cells_speed_min: string;
  cells_speed_max: string;
  injection_a_start_position_min: string;
  injection_a_start_position_max: string;
  injection_b_start_position_min: string;
  injection_b_start_position_max: string;
  injection_c_start_position_min: string;
  injection_c_start_position_max: string;
  injection_d_start_position_min: string;
  injection_d_start_position_max: string;
  injection_a_end_position_min: string;
  injection_a_end_position_max: string;
  injection_b_end_position_min: string;
  injection_b_end_position_max: string;
  injection_c_end_position_min: string;
  injection_c_end_position_max: string;
  injection_d_end_position_min: string;
  injection_d_end_position_max: string;
  tube_molding_start_position_min: string;
  tube_molding_start_position_max: string;
  tube_molding_end_position_min: string;
  tube_molding_end_position_max: string;
  polimerization_furnace_temp_min: string;
  polimerization_furnace_temp_max: string;
  internal_varnish_porosity_min: string;
  internal_varnish_porosity_max: string;
}

export interface CreateOffsetTresholdDto {
  product_id: number | null;
  conveyor_id: number | null;
  printing_machine_speed_min: string;
  printing_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  padding_furnace_temp_min: string;
  padding_furnace_temp_max: string;
  offset_furnace_temp_min: string;
  offset_furnace_temp_max: string;
  printer_motor_min: string;
  printer_motor_max: string;
  base_covers_holders_motor_min: string;
  base_covers_holders_motor_max: string;
  base_covers_station_motor_min: string;
  base_covers_station_motor_max: string;
  imprint_quantity_printed_box_1_min: string;
  imprint_quantity_printed_box_1_max: string;
  imprint_quantity_printed_box_2_min: string;
  imprint_quantity_printed_box_2_max: string;
  imprint_quantity_printed_box_3_min: string;
  imprint_quantity_printed_box_3_max: string;
  imprint_quantity_printed_box_4_min: string;
  imprint_quantity_printed_box_4_max: string;
  imprint_quantity_printed_box_5_min: string;
  imprint_quantity_printed_box_5_max: string;
  imprint_quantity_printed_box_6_min: string;
  imprint_quantity_printed_box_6_max: string;
  ink_supply_time_min: string;
  ink_supply_time_max: string;
}

export interface CreateSealantTresholdDto {
  product_id: number | null;
  conveyor_id: number | null;
  cap_machine_speed_min: string;
  cap_machine_speed_max: string;
  total_air_pressure_min: string;
  total_air_pressure_max: string;
  holders_forward_min: string;
  holders_forward_max: string;
  holders_opening_left_min: string;
  holders_opening_left_max: string;
  holders_opening_right_min: string;
  holders_opening_right_max: string;
  holders_closing_min: string;
  holders_closing_max: string;
  injection_a_start_min: string;
  injection_a_start_max: string;
  injection_b_start_min: string;
  injection_b_start_max: string;
  injection_a_end_min: string;
  injection_a_end_max: string;
  injection_b_end_min: string;
  injection_b_end_max: string;
  injection_tube_orientation_start_min: string;
  injection_tube_orientation_start_max: string;
  injection_tube_orientation_end_min: string;
  injection_tube_orientation_end_max: string;
  latex_ring_padding_min: string;
  latex_ring_padding_max: string;
  latex_ring_width_min: string;
  latex_ring_width_max: string;
  tube_rigidity_min: string;
  tube_rigidity_max: string;
  cap_unscrewing_torque_min: string;
  cap_unscrewing_torque_max: string;
}

export default class TubeTresholdsService {
  static async getExtrusionTresholds(dto: FetchTubeTresholdsDto): Promise<TubeExtrusionTresholdResponse> {
    const res = await $apiTubes.get(
      `/tresholds/extrusion?page=${dto.page}&limit=${dto.limit}&code=${dto.filter.code}&marking=${
        dto.filter.marking
      }${dto.filter.empty.map((item) => `&empty=${item}`)}${dto.filter.conveyors.map((item) => `&conveyors=${item}`)}`
    );
    return res.data;
  }

  static async getVarnishTresholds(dto: FetchTubeTresholdsDto): Promise<TubeVarnishTresholdResponse> {
    const res = await $apiTubes.get(
      `/tresholds/varnish?page=${dto.page}&limit=${dto.limit}&code=${dto.filter.code}&marking=${
        dto.filter.marking
      }${dto.filter.empty.map((item) => `&empty=${item}`)}${dto.filter.conveyors.map((item) => `&conveyors=${item}`)}`
    );
    return res.data;
  }

  static async getOffsetTresholds(dto: FetchTubeTresholdsDto): Promise<TubeOffsetTresholdResponse> {
    const res = await $apiTubes.get(
      `/tresholds/offset?page=${dto.page}&limit=${dto.limit}&code=${dto.filter.code}&marking=${
        dto.filter.marking
      }${dto.filter.empty.map((item) => `&empty=${item}`)}${dto.filter.conveyors.map((item) => `&conveyors=${item}`)}`
    );
    return res.data;
  }

  static async getSealantTresholds(dto: FetchTubeTresholdsDto): Promise<TubeSealantTresholdResponse> {
    const res = await $apiTubes.get(
      `/tresholds/sealant?page=${dto.page}&limit=${dto.limit}&code=${dto.filter.code}&marking=${
        dto.filter.marking
      }${dto.filter.empty.map((item) => `&empty=${item}`)}${dto.filter.conveyors.map((item) => `&conveyors=${item}`)}`
    );
    return res.data;
  }

  static async createExtrusionTreshold(dto: CreateExtrusionTresholdDto) {
    const res = await $apiTubes.post(`/tresholds/extrusion`, dto);
    return res.data;
  }

  static async createVarnishTreshold(dto: CreateVarnishTresholdDto) {
    const res = await $apiTubes.post(`/tresholds/varnish`, dto);
    return res.data;
  }

  static async createOffsetTreshold(dto: CreateOffsetTresholdDto) {
    const res = await $apiTubes.post(`/tresholds/offset`, dto);
    return res.data;
  }
  static async createSealantTreshold(dto: CreateSealantTresholdDto) {
    const res = await $apiTubes.post(`/tresholds/sealant`, dto);
    return res.data;
  }
}
