import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IPrinter {
  id: number;
  conveyor_id: number;
  ip: string;
  port: number;
}

export default class PrinterService {
  static async getPrinter(conveyor_id: number | null): Promise<IPrinter | null> {
    const res = await $api.get(`${ApiRoutes.PRINTER}?conveyor_id=${conveyor_id}`);
    return res.data;
  }
}
