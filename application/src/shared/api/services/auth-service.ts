import { AxiosResponse } from "axios";
import { $api, $clearApi } from "../http";
import { ApiRoutes } from "../http/apiRoutes";

export interface AuthResponce {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export default class AuthService {
  static async register(name: string, email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
    const res = await $api.post(ApiRoutes.REGISTER, { name, email, password });
    return res.data;
  }
  static async login(dto: LoginDto): Promise<any> {
    return $api.post(ApiRoutes.LOGIN, dto);
  }
  static async logout(): Promise<void> {
    return $api.post(ApiRoutes.LOGOUT);
  }
  static async refresh() {
    return $api.post(ApiRoutes.REFRESH);
  }
  static async check() {
    return $clearApi.post(ApiRoutes.REFRESH);
  }
}
