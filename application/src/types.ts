export interface IPlant {
  id: number;
  value: string;
}

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
  barcode: string;
  occupation: IOccupation;
}

export interface IOccupation {
  id: number;
  value: string;
  description: string;
}

export interface IHistory {
  id: number;
  recordId: number;
  record_id: number;
  boil_id: number;
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
  doc: IDoc;
}

export interface SummaryResponse {
  id: number;
  plantId: number;
  createdAt: Date;
  updatedAt: Date;
  plants: IPlant;
  records: IRecord[];
}

export interface ISummary {
  code1C: string;
  product: string;
  serie: string;
  boil: string;
  apparatus: string;
  can: string;
  plan: string;
  bbf: string;
  note: string;
  workshop: string;
}

export interface IDoc {
  id: number;
  plantId: number;
  date: Date;
  records_count: string;
  histories_count: string;
  plants: IPlant;
  records: IRecord[];
}

export interface ISummaryUploadData {
  plantId: string;
  summaryDate: string;
  rows: ISummary[];
}

export interface IXLSData {
  code1C: string;
  product: string;
  serie: string;
  boil: string;
  apparatus: string;
  can: string;
  plan: string;
  bbf: string;
  note: string;
  workshop: string;
}

// export interface IDoc {
//   id: number;
//   plantId: number;
//   date: Date;
//   records_count: string;
//   histories_count: string;
//   plants: IPlant;
// }
