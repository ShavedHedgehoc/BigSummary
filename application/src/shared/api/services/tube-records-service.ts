// import { $api } from "../http";

import { $apiTubes } from "../http";

export interface IXLSXTubeRecordRowData {
  code1C: string;
  product_marking: string;
  product_name: string;
  batch: string;
  plan: string;
  conveyor: string;
  specification: string;
}

export interface ITubeRecordsUploadData {
  summaryDate: string;
  update: boolean;
  rows: IXLSXTubeRecordRowData[];
}

export interface IChangeTubeRecorStatedDto {
  id: number;
}

interface IProduct {
  id: number;
  code: string;
  marking: string;
  name: string;
}

interface IBatch {
  id: number;
  name: string;
}

interface IConveyor {
  id: number;
  name: string;
}

export interface IAvailableSummary {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: Date;
  product: IProduct;
  batch: IBatch;
}

export interface IAvailabletubeSummariesResponse {
  summaries: IAvailableSummary[] | [];
}

export interface FetchTubeRecordsListFilter {
  code: string;
  start_date: string;
  end_date: string;
  states: number[] | [];
  conveyors: number[] | [];
}

export interface FetchTubeRecordsListDto {
  filter: FetchTubeRecordsListFilter;
  page: number;
  limit: number;
}

interface TubePostStatusRecordCount {
  extrusion_statuses: number;
  varnish_statuses: number;
  offset_statuses: number;
  sealant_statuses: number;
}

export interface ITubeRecordRow {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  product: IProduct;
  batch: IBatch;
  conveyor: IConveyor;
  date: Date;
  _count: TubePostStatusRecordCount;
}

export interface TubeRecordsListResponce {
  rows: ITubeRecordRow[] | [];
  total: number;
}

export interface TubeRecordDetailData {
  id: number;
  date: Date;
  batch_name: string;
  product_id: number;
  product_code: string;
  product_name: string;
  marking: string;
  batch_id: number;
  conveyor_id: number;
  conveyor_name: string;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
}

export interface TubeRecordDetailConsumedMaterial {
  code: string;
  name: string;
  lot: string;
}

export interface TubeRecordDetailDataExtrusionParam {
  id: number;
  summary_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  rondel: string;
  tube_cilindrical_section_length: number;
  membrane_thickness: number;
  tube_diameter: number;
  tube_cilindrical_section_thickness: number;
  tube_rigidity: number;
  tube_cutting_quality: boolean;
  tightness: boolean;
  external_thread_quality: boolean;
  employee: string;
  createdAt: Date;
  consumed_materials: TubeRecordDetailConsumedMaterial[] | [];
}

export interface TubeRecordDetailDataVarnishParam {
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
  employee: string;
  createdAt: Date;
  consumed_materials: TubeRecordDetailConsumedMaterial[] | [];
}
export interface TubeRecordDetailDataOffsetParam {
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
  employee: string;
  createdAt: Date;
  consumed_materials: TubeRecordDetailConsumedMaterial[] | [];
}
export interface TubeRecordDetailDataSealantParam {
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
  employee: string;
  createdAt: Date;
  consumed_materials: TubeRecordDetailConsumedMaterial[] | [];
}

export interface TubeRecordDetailOperation {
  id: number;
  counter_value: number;
  idle_time: number;
  createdAt: Date;
  employee: string | null;
  operation_value: string;
  operation_description: string;
}

export type PostState = "working" | "finished" | "idle";
export interface TubeRecordDetailDataExtrusion {
  params: TubeRecordDetailDataExtrusionParam[] | [];
  operations: TubeRecordDetailOperation[];
  defect: number | null;
  status: PostState | null;
}

export interface TubeRecordDetailDataVarnish {
  params: TubeRecordDetailDataVarnishParam[] | [];
  operations: TubeRecordDetailOperation[];
  defect: number | null;
  status: PostState | null;
}
export interface TubeRecordDetailDataOffset {
  params: TubeRecordDetailDataOffsetParam[] | [];
  operations: TubeRecordDetailOperation[];
  defect: number | null;
  status: PostState | null;
}
export interface TubeRecordDetailDataSealant {
  params: TubeRecordDetailDataSealantParam[] | [];
  operations: TubeRecordDetailOperation[];
  defect: number | null;
  status: PostState | null;
}

export interface TubeRecordDetail {
  data: TubeRecordDetailData;
  extrusion: TubeRecordDetailDataExtrusion;
  varnish: TubeRecordDetailDataVarnish;
  offset: TubeRecordDetailDataOffset;
  sealant: TubeRecordDetailDataSealant;
}

export default class TubeRecordsService {
  static async bulkCreateTubeRecords(dto: ITubeRecordsUploadData) {
    const res = await $apiTubes.post(`/summaries`, dto);
    return res.data;
  }

  static async getAvailableTubeRecords(conveyor_id: number | null): Promise<IAvailabletubeSummariesResponse> {
    const res = await $apiTubes.get(`/summaries/available?conveyor_id=${conveyor_id}`);
    return res.data;
  }

  static async finishTubeRecord(dto: IChangeTubeRecorStatedDto) {
    const res = await $apiTubes.patch(`/summaries/set_finish`, dto);
    return res.data;
  }

  static async startTubeRecord(dto: IChangeTubeRecorStatedDto) {
    const res = await $apiTubes.patch(`/summaries/set_active`, dto);
    return res.data;
  }

  static async deleteTubeRecord(id: number) {
    const res = await $apiTubes.delete(`/summaries/${id}`);
    return res.data;
  }

  static async getTubeRecordDetail(id: string | undefined): Promise<TubeRecordDetail> {
    const res = await $apiTubes.get(`/summaries/detail/${id}`);
    return res.data;
  }

  static async getRecordsList(dto: FetchTubeRecordsListDto): Promise<TubeRecordsListResponce> {
    const res = await $apiTubes.get(
      `/summaries?start_date=${dto.filter.start_date}&end_date=${dto.filter.end_date}&page=${dto.page}&limit=${
        dto.limit
      }&code=${dto.filter.code}${dto.filter.states.map((item) => `&states=${item}`)}${dto.filter.conveyors.map(
        (item) => `&conveyors=${item}`
      )}`
    );
    return res.data;
  }
}
