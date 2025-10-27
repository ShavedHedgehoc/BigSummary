import { AxiosResponse } from "axios";
import { $api, $clearApi } from "../http";
import { ApiRoutes } from "../http/apiRoutes";
import { IUser } from "../../../modules/auth/store/auth-store";

export interface AuthResponce {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export default class AuthService {
  static async register(dto: RegisterDto): Promise<AxiosResponse<AuthResponce>> {
    return $api.post(ApiRoutes.REGISTER, dto);
  }
  static async login(dto: LoginDto): Promise<AxiosResponse<AuthResponce>> {
    return $api.post(ApiRoutes.LOGIN, dto);
  }
  static async logout(): Promise<void> {
    return $api.post(ApiRoutes.LOGOUT);
  }
  static async refresh(): Promise<AxiosResponse<AuthResponce>> {
    return $api.post(ApiRoutes.REFRESH);
  }
  static async check(): Promise<AxiosResponse<AuthResponce>> {
    return $clearApi.post(ApiRoutes.REFRESH);
  }
}
