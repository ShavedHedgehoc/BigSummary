import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface PrintReceiptDto {
  ip: string; //"192.168.250.95";
  port: number; //9100;
  zpl: string; //"^XA^CI28^FO20,20 ^FB700,3,,L^A0N,50,50^FDZPL Print success!!!^FS^PQ1^XZ";
}

export default class ZPLService {
  static async printReceipt(dto: PrintReceiptDto) {
    const res = await $api.post(ApiRoutes.ZPL, dto);
    return res.data;
  }
}
