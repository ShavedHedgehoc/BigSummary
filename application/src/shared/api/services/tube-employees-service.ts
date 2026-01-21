import { $apiTubes } from "../http";
import { IRank } from "./tube-ranks-service";

export interface ITubeEmployee {
  id: number;
  name: string;
  barcode: string;
  rank_id: number | null;
  rank: IRank;
  banned: boolean;
}

export interface EmployeeListResponse {
  employees: ITubeEmployee[] | [];
  total: number;
}

export interface CreateTubeEmployeeDto {
  name: string;
  barcode: string;
  rank_id: number;
}

export interface UpdateTubeEmployeeDto {
  id: number;
  name: string;
  barcode: string;
  rank_id: number;
}
export interface FetchTubeEmployeesFilter {
  name: string;
  nameAsc: boolean;
  banned: number[] | [];
  ranks: number[] | [];
}

export interface FetchTubeEmployeesDto {
  filter: FetchTubeEmployeesFilter;
  page: number;
  limit: number;
}

export default class TubeEmployeesService {
  static async getEmployeesList(dto: FetchTubeEmployeesDto): Promise<EmployeeListResponse> {
    const res = await $apiTubes.get(
      `/employees/list?name=${dto.filter.name}&name_asc=${dto.filter.nameAsc}&page=${dto.page}&limit=${
        dto.limit
      }${dto.filter.banned.map((item) => `&banned=${item}`)}${dto.filter.ranks.map((item) => `&ranks=${item}`)}`
    );
    return res.data;
  }

  static async changeBanned(id: number) {
    const res = await $apiTubes.patch(`/employees/change_banned/${id}`);
    return res.data;
  }

  static async createEmployee(dto: CreateTubeEmployeeDto) {
    const res = await $apiTubes.post(`/employees`, dto);
    return res.data;
  }

  static async updateEmployee(dto: UpdateTubeEmployeeDto) {
    const res = await $apiTubes.patch(`/employees`, dto);
    return res.data;
  }

  static async deleteEmployee(id: number) {
    const res = await $apiTubes.delete(`/employees/${id}`);
    return res.data;
  }
}
