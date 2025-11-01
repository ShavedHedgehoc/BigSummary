import { $api } from "../http";

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
  user_settings: IUserSettings | null;
}

export interface IUserResponse {
  rows: IUserRow[];
  total: number;
}

export interface IUpdateUserRolesDto {
  id: number;
  roles: number[];
}

interface IUserSettingsPlant {
  value: string;
}

interface IUserSettings {
  plant_id: number;
  plant: IUserSettingsPlant;
}

interface IUserUpdateSettings {
  plant_id: number;
}

export interface IUpdateUserDto {
  user_id: number;
  name: string;
  email: string;
  user_settings: IUserUpdateSettings | null;
}

export default class UserService {
  static async getUsers(dto: FetchUsersDto): Promise<IUserResponse> {
    const res = await $api.post(`/users/list`, dto);
    return res.data;
  }
  static async updateUserRoles(data: IUpdateUserRolesDto): Promise<IUserResponse> {
    return await $api.post(`/users/update_roles`, data);
  }
  static async changeBannedStatus(id: number): Promise<IUserResponse> {
    return await $api.get(`/users/change_banned/${id}`);
  }

  static async getUserById(id: number | null): Promise<IUserRow> {
    return await $api.get(`/users/change_banned/${id}`);
  }

  static async updateUser(data: IUpdateUserDto): Promise<any> {
    return await $api.put(`/users`, data);
  }
}
