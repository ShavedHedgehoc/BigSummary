import { $api } from "../http";

export interface ITraceCanData {
  id: number;
  name: string;
  volume: number;
  baseContain: string;
  baseContainMarking: string;
  stateValue: string; // value
  state: string; // description
  stateTime: Date;
  author: string;
  isUpdated: boolean;
  plant: string;
  transit: boolean;
}

export interface ITraceCan {
  CanPK: number;
  CanName: string;
  CanVolume: number;
  CanBarcode: string | null;
  PlantPK: number;
  plant_name: string;
}

export interface ITraceCanResponse {
  rows: ITraceCan[];
  total: number;
}

export interface FetchCansListFilter {
  value: string;
  valueAsc: boolean;
  onlyEmptyBarcode: boolean;
  plants: number[] | [];
}

export interface FetchCansListDto {
  filter: FetchCansListFilter;
  page: number;
  limit: number;
}

export interface FetchCansFilter {
  can: string;
  volumes: number[] | [];
  states: number[] | [];
  plants: number[] | [];
  transit: boolean;
}

export interface FetchCansDto {
  filter: FetchCansFilter;
}

export interface ITraceCanVolume {
  volume: number;
}

export default class TraceCansService {
  static async getCans(): Promise<ITraceCanData[]> {
    const res = await $api.get(`trace-cans`);
    return res.data;
  }

  static async getCanVolumes(): Promise<ITraceCanVolume[]> {
    const res = await $api.get(`trace-cans/volumes`);
    return res.data;
  }
  static async getCansWithParams(dto: FetchCansDto): Promise<ITraceCanData[]> {
    const res = await $api.post(`trace-cans`, dto);
    return res.data;
  }

  static async getCansListWithParams(dto: FetchCansListDto): Promise<ITraceCanResponse> {
    const res = await $api.post(`trace-cans/list`, dto);
    return res.data;
  }
}
