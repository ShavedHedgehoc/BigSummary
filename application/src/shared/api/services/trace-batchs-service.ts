import { $api } from "../http";

export interface ITraceBatchRowData {
  batch_id: number;
  batch_name: string;
  date: Date;
  plant: string;
  product_id: string;
  marking: string;
}

export interface ITraceBatchDetailSummaryRow {
  b_product_id: string;
  b_product_name: string;
  plan_q: number;
  w_product_id: string;
  w_product_name: string;
  fact_q: number;
}

export interface ITraceBatchDetailData {
  summary_data: ITraceBatchDetailSummaryRow[];
}

export interface FetchTraceBatchsFilter {
  batch: string;
  marking: string;
  startDate: string;
  endDate: string;
  month: string;
  year: string;
  plants: string[] | [];
}

export interface FetchTraceBatchsDto {
  filter: FetchTraceBatchsFilter;
  limit: number;
  page: number;
}

export interface ITraceBatchsListData {
  rows: ITraceBatchRowData[];
  total: number;
}

export interface ITraceBatchWghtReportFilter {
  batchName: string;
  productId: string;
  startDate: string;
  endDate: string;
  compare: boolean;
  sortByBatch: boolean;
  plants: string[] | [];
}

export interface FetchTraceBatchWghtReportDto {
  filter: ITraceBatchWghtReportFilter;
  limit: number;
  page: number;
}

export interface ITraceBatchWghtReportRowData {
  batch_id: number;
  batch_name: string;
  plant: string;
  batch_date: Date;
  product_id: string;
  product_name: string;
  plan_q: number;
  fact_q: number;
  BatchYear: number;
  BatchMonth: string;
  BatchNumber: number;
}

export interface ITraceBatchWghtReportData {
  rows: ITraceBatchWghtReportRowData[];
  total: number;
}

export interface FetchTraceBatchWghtReportDetailDto {
  batchName: string;
  productId: string;
}

export interface ITraceBatchWghtReportDetailData {
  weighting_pk: number;
  container_pk: number;
  product_id: string;
  product_name: string;
  lot_name: string;
  quantity: number;
  author: string;
  w_date: Date;
  records: number;
  l_date: null | Date;
}

export interface FetchTraceWeightingsSummaryFilter {
  startDate: string;
  endDate: string;
  author: string;
  plants: string[] | [];
}

export interface GetWeightingsSummaryDto {
  filter: FetchTraceWeightingsSummaryFilter;
}

export interface ITraceWeightingsSummaryData {
  w_author_id: number;
  w_name: string;
  w_rows: number;
  w_total: number;
  w_start_date: Date;
  w_end_date: Date;
}

// export interface GetWeightingsSummaryDetailFilter {
//   startDate: string|null;
//   endDate: string|null;
//   author_id: number|null;
// }

export interface GetWeightingsSummaryDetailDto {
  startDate: string | null;
  endDate: string | null;
  author_id: number | null;
  limit: number;
  page: number;
}

export interface ITraceWeightingsSummaryDetailRow {
  w_id: number;
  w_date: Date;
  w_batch_name: string;
  w_product_id: string;
  w_product_name: string;
  w_lot_name: string;
  w_quantity: number;
}

export interface ITraceWeightingsSummaryDetailData {
  rows: ITraceWeightingsSummaryDetailRow[];
  total: number;
}

export default class TraceBatchService {
  static async getTraceBatchsWithFilter(dto: FetchTraceBatchsDto): Promise<ITraceBatchsListData> {
    const res = await $api.post(`/trace-batch`, dto);
    return res.data;
  }

  static async getTraceBatchById(id: string | undefined): Promise<ITraceBatchRowData> {
    const res = await $api.get(`/trace-batch/by_id/${id}`);
    return res.data;
  }

  static async getTraceBatchDetailById(id: string | undefined): Promise<ITraceBatchDetailData> {
    const res = await $api.get(`/trace-batch/detail/${id}`);
    return res.data;
  }

  static async getTraceBatchsWghtReport(dto: FetchTraceBatchWghtReportDto): Promise<ITraceBatchWghtReportData> {
    const res = await $api.post(`/trace-batch/wght-report`, dto);
    return res.data;
  }

  static async getTraceBatchsWghtReportDetail(
    dto: FetchTraceBatchWghtReportDetailDto
  ): Promise<ITraceBatchWghtReportDetailData[] | []> {
    const res = await $api.post(`/trace-batch/wght-report-detail`, dto);
    return res.data;
  }

  static async deleteWeightingsByContainerId(id: number): Promise<any> {
    // const res = await $api.delete(`/trace-batch/delete_by_container/${id}`);
    return await $api.delete(`/trace-batch/delete_by_container/${id}`);
  }

  static async getWeightingsSummary(dto: GetWeightingsSummaryDto): Promise<ITraceWeightingsSummaryData[] | []> {
    const res = await $api.post(`/trace-batch/weightings_department_summary`, dto);
    return res.data;
  }

  static async getWeightingsSummaryDetail(
    dto: GetWeightingsSummaryDetailDto
  ): Promise<ITraceWeightingsSummaryDetailData> {
    const res = await $api.post(`/trace-batch/weightings_department_summary_detail`, dto);
    return res.data;
  }
}
