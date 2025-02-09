import { $api } from "../http";
import { AxiosResponse } from "axios";
// import { IRole } from "../types";

export interface IRole {
  id: number;
  value: string;
  description: string;
}

export default class RoleService {
  //Remove if not need
  static async getRoles(): Promise<AxiosResponse<IRole[]>> {
    return $api.get(`/roles`);
  }

  static async getAllRoles(): Promise<IRole[]> {
    const res = await $api.get(`/roles`);
    return res.data;
  }
}
