import axios from "axios";

export interface IBoilRow {
  id: number;
  value: string;
  recordsCount: number;
  historiesCount: number;
  state: string;
  state_id: number;
  stateValue: string;
  base_code: string;
  base_marking: string;
  plant: string;
}

export interface IBoilData {
  rows: IBoilRow[];
  total: number;
}

export interface FetchBoilsFilter {
  boil: string;
  baseCode: string;
  marking: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  plants: number[] | [];
}

export interface FetchBoilsDto {
  filter: FetchBoilsFilter;
  page: number;
  limit: number;
}

export default class BoilService {
  static async getBoilsListWithParams(dto: FetchBoilsDto): Promise<IBoilData> {
    const res = await axios.post(`/api/boils_list`, dto);
    return res.data;
  }
}
