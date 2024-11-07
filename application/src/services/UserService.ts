import { $api } from "../shared/api/http";
import { AxiosResponse } from "axios";

export interface IRole {
  id: number;
  value: string;
  description: string;
}

export interface IUserRow {
  id: number;
  name: string;
  email: string;
  banned: boolean;
  roles: IRole[] | [];
}

export interface IUserResponse {
  users: IUserRow[];
  total: number;
}

export interface IUpdateUserRolesDto {
  id: number;
  roles: number[];
}

export default class UserService {
  //remove after new user page
  static async getUsers(): Promise<AxiosResponse<IUserRow[]>> {
    return $api.get(`/users`);
  }

  static async getUsersWithParams(): Promise<IUserResponse> {
    const res = await $api.post(`/users/list`);
    return res.data;
  }
  static async updateUserRoles(data: IUpdateUserRolesDto): Promise<IUserResponse> {
    return await $api.post(`/users/update_roles`, data);
  }
  static async changeBannedStatus(id: number): Promise<IUserResponse> {
    return await $api.get(`/users/change_banned/${id}`);
  }
}
