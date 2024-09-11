import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IPlant } from "../types/plant";

// export interface IPlant {
//   id: number;
//   value: string;
// }

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

export interface SummaryResponce {
  id: number;
  plantId: number;
  createdAt: Date;
  updatedAt: Date;
  plants: IPlant;
  records: IRecord[];
}

export default class SummaryService {
  static async getRecords(plantId: string | undefined): Promise<AxiosResponse<SummaryResponce>> {
    return $api.get(`/docs/${plantId}`);
  }

  static async getRecordById(recordId: string | undefined): Promise<AxiosResponse<IRecord>> {
    return $api.get(`/records/detail/${recordId}`);
  }
}
