import { $api } from "../http";

export default class RoleService {
  static async getAllRoles(): Promise<IRole[]> {
    const res = await $api.get(`/roles`);
    return res.data;
  }
}
