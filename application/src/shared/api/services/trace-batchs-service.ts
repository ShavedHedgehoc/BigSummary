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
  batchDate: string;
  compare: boolean;
  plants: string[] | [];
}

export interface FetchTraceBatchWghtReportDto {
  filter: ITraceBatchWghtReportFilter;
  limit: number;
  page: number;
}

export interface ITraceBatchWghtReportRowData {
  res_batch_name: string;
  b_product_id: string;
  b_product_name: string;
  res_plan: number;
  w_product_id: string;
  w_product_name: string;
  res_fact: number;
  batch_month: string;
  batch_year: number;
  batch_number: number;
  res_batch_date: Date;
  plant_name: string;
}

export interface ITraceBatchWghtReportData {
  rows: ITraceBatchWghtReportRowData[];
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
}
