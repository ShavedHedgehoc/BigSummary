import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IUserRow } from "../types";

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUserRow[]>> {
    return $api.get(`/users`);
  }
}
