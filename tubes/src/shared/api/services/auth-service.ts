import axios from "axios";

export interface IEmployee {
  id: number;
  name: string;
}

export interface IAuthResponse {
  employee: IEmployee;
}

export interface LoginDto {
  conveyor_name: string;
  barcode: string;
}

export default class AuthService {
  static async getAuthEmployee(conveyor_name: string | null): Promise<IAuthResponse | null> {
    const res = await axios.get(`/api/tube-sessions/${conveyor_name}`);
    return res.data;
  }

  static async logout(conveyor_name: string): Promise<any> {
    await axios({
      method: "post",
      url: `/api/tube-sessions/logout`,
      headers: {},
      data: {
        conveyor_name: conveyor_name,
      },
    });
  }

  static async login(dto: LoginDto): Promise<any> {
    await axios({
      method: "post",
      url: `/api/tube-sessions/login`,
      headers: {},
      data: {
        ...dto,
      },
    });
  }
}
