import { $api } from "../http";
import { ApiRoutes } from "./api-routes";
import type { IEmployee } from "./employee-service";
import type { IProduct } from "./product-service";

export interface CreateProductionBoxDto {
  uuid: string;
  summary_id: string;
  batch_id: string;
  employee_id: string;
  quantity: string;
  createdAt: string;
  box_number: string;
}

interface IBatch {
  id: number;
  name: string;
}
interface IShortSummary {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: Date;
  batch: IBatch;
  product: IProduct;
}

export interface IProductionBox {
  id: number;
  box_number: number;
  uuid: string;
  batch_id: number;
  employee_id: number;
  quantity: number;
  createdAt: Date;
  employee: IEmployee;
  summary: IShortSummary;
}

export default class ProductionBoxService {
  static async createProductionBox(dto: CreateProductionBoxDto) {
    const res = await $api.post(`${ApiRoutes.PRODUCTION_BOX}`, dto);
    return res.data;
  }

  static async getProductionBoxes(batch_id: number | null): Promise<IProductionBox[] | []> {
    const res = await $api.get(`${ApiRoutes.PRODUCTION_BOX}?summary_id=${batch_id}`);
    return res.data;
  }
}
