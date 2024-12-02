export interface IDocRow {
  id: number;
  productId: number;
  product: string;
  boil: string;
  plan: number;
  apparatus: string;
  bbf: string;
  note: string;
  can: string;
  conveyor: string;
  workshop: string;
  historiesCount: number;
  state: string;
  stateValue: string;
  isSet: boolean;
}

export interface SummaryResponse {
  id: number;
  plantId: number;
  plant: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  records: IDocRow[];
}

//////////
export interface IDoc {
  id: number;
  date: Date;
  recordsCount: number;
  historiesCount: number;
  plant: string;
}

export interface IRecordDetailRecord {
  id: number;
  date: Date;
  plant: string;
  product: string;
  boil: string;
  conveyor: string;
}

export interface IBoilFilter {
  baseCode: string;
  boil: string;
}

export interface IBoilParams {
  filter: IBoilFilter;
  limit: number;
  page: number;
}

//////////////
export interface IPlant {
  id: number;
  value: string;
  abb: string;
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
  note_id: number;
}

export interface IRole {
  id: number;
  value: string;
  description: string;
}

export interface IUserRow {
  id: number;
  name: string;
  email: string;
  banned: boolean;
  roles: string[];
}

export interface IRecord {
  doc: IDoc;
  id: number;
  productId: number;
  // product: string;
  // boil: string;
  plan: number;
  // apparatus: string;
  bbf: string;
  note: string;
  // can: string;
  // conveyor: string;
  // workshop: string;
  historiesCount: number;
  state: string;
  stateValue: string;
  docId: number;
  doc_id: number;

  boilId: number;
  apparatusId: number;
  canId: number;
  conveyorId: number;

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

export interface ISummary {
  code1C: string;
  product: string;
  serie: string;
  // boil: string;
  batch: string;
  apparatus: string;
  can: string;
  plan: string;
  bbf: string;
  note: string;
  workshop: string;
  boil1: string;
  boil2: string;
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
  // boil: string;
  batch: string;
  apparatus: string;
  can: string;
  plan: string;
  bbf: string;
  note: string;
  workshop: string;
  boil1: string;
  boil2: string;
}

export interface IBoilsListItem {
  id: number;
  value: string;
  recordsCount: number;
  historiesCount: number;
  state: string;
  stateValue: string;
  base_code: string;
  base_marking: string;
}

// export interface IDoc {
//   id: number;
//   plantId: number;
//   date: Date;
//   records_count: string;
//   histories_count: string;
//   plants: IPlant;
// }
