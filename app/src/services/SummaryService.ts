import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IPlant } from "./PlantService";
import { ISummaryUploadData } from "../components/pages/planner/SummaryUpload";

export interface ISerie {
  id: number;
  value: string;
}

export interface IBoil {
  id: number;
  value: string;
}

export interface IApparatus {
  id: number;
  value: string;
}
export interface ICan {
  id: number;
  value: string;
}

export interface IConveyor {
  id: number;
  value: string;
}
export interface IWorkshop {
  id: number;
  value: string;
}

export interface IProduct {
  id: number;
  code1C: string;
  marking: string;
  name: string | null;
  serieId: number;
  createdAt: Date;
  updatedAt: Date;
  serie: ISerie;
}

export interface IHistoryType {
  id: number;
  value: string;
  description: string;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IEmployee {
  id: number;
  name: string;
}
export interface IHistory {
  id: number;
  recordId: number;
  historyTypeId: number;
  userId: number;
  employeeId: number;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  historyType: IHistoryType;
  user: IUser | null;
  employee: IEmployee | null;
}

export interface IRecord {
  id: number;
  docId: number;
  productId: number;
  boilId: number;
  apparatusId: number;
  canId: number;
  conveyorId: number;
  plan: number;
  bbf: string;
  note: string;
  workshopId: number;
  createdAt: Date;
  updatedAt: Date;
  product: IProduct;
  boil: IBoil;
  apparatus: IApparatus;
  can: ICan;
  conveyor: IConveyor;
  workshop: IWorkshop;
  histories: IHistory[] | [];
}

export interface SummaryResponse {
  id: number;
  plantId: number;
  createdAt: Date;
  updatedAt: Date;
  plants: IPlant;
  records: IRecord[];
}

export interface DocResponse {}

export default class SummaryService {
  static async getRecords(plantId: string): Promise<AxiosResponse<SummaryResponse>> {
    return $api.get(`/docs/${plantId}`);
  }

  static async getDocs(): Promise<AxiosResponse<DocResponse>> {
    return $api.get(`/docs`);
  }

  static bulkCreateRecords(data: ISummaryUploadData) {
    return $api.post(`/records/bulkcreate`, data);
  }
}
