import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IRole } from "../types";

export default class RoleService {
  static async getRoles(): Promise<AxiosResponse<IRole[]>> {
    return $api.get(`/roles`);
  }
}
