interface TheadProperties {
  width: number;
  align?: CanvasTextAlign;
  padding?: string;
  value: string;
}

interface IHistory {
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
  history_note: IHistoryNote;
}

interface IHistoryNote {
  id: number;
  value: string;
}
interface IOccupation {
  id: number;
  value: string;
  description: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

interface IHistoryType {
  id: number;
  value: string;
  description: string;
}

interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupation: IOccupation;
}

interface IPlant {
  id: number;
  value: string;
  abb: string;
}

interface IRole {
  id: number;
  value: string;
  description: string;
}

interface IDocument {
  id: number;
  plantId: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  plants: IPlant;
}

interface IDocRow {
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
  water_base_id: number;
  plant_id: number;
}

interface AddHistoryDto {
  record_id: number | null;
  historyType: string | null;
  boil_value: string | null;
  userId: number | null;
  employeeId: number | null;
  note: string | null;
  history_note: string | null;
}

interface FetchBoilsFilter {
  boil: string;
  baseCode: string;
  marking: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  plants: number[] | [];
}

interface FetchEmployeesFilter {
  name: string;
  nameAsc: boolean;
  occupations: number[] | [];
}

interface FetchUsersFilter {
  name: string;
  nameAsc: boolean;
  email: string;
  banned: number[] | [];
  roles: number[] | [];
}

interface FetchUsersDto {
  filter: FetchUsersFilter;
  page: number;
  limit: number;
}

interface FetchUsersFilterFormField {
  key: string;
  value: string;
  values?: number[];
}

interface FetchDocumentsFilter {
  startDate: string;
  endDate: string;
  plants: number[] | [];
}

interface FetchDocumentsFilterFormField {
  key: string;
  value: string;
  values?: number[];
}

interface DocsUploadFormField {
  key: string;
  value: string;
  values?: number[];
}

interface FetchDocumentsDto {
  filter: FetchDocumentsFilter;
  page: number;
  limit: number;
}

interface IDocumentRow {
  id: number;
  date: Date;
  plant: string;
  recordsCount: number;
  historiesCount: number;
}

interface IDocumentData {
  rows: IDocumentRow[];
  total: number;
}

interface FetchProductFilter {
  boil: string;
  productCode: string;
  marking: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  plant: number | null;
  conveyor: string;
}

interface FetchDocDetailFilter {
  boil: string;
  productCode: string;
  marking: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  conveyor: string;
}

interface FetchBoilsDto {
  filter: FetchBoilsFilter;
  page: number;
  limit: number;
}

interface FetchEmployeesDto {
  filter: FetchEmployeesFilter;
  page: number;
  limit: number;
}

interface FetchProductsDto {
  filter: FetchProductFilter;
}

interface UpdateRecordDto {
  id: number;
  apparatus: string;
  can: string;
  conveyor: string;
  plan: string;
  note: string;
}

interface FetchProductsWithDocIdDto {
  doc_id: string | undefined;
  filter: FetchDocDetailFilter;
}

interface FetchBoilsFilterFormField {
  key: string;
  value: string;
  values?: number[];
}

interface IBoilData {
  rows: IBoilRow[];
  total: number;
}

interface IBoilRow {
  id: number;
  value: string;
  recordsCount: number;
  historiesCount: number;
  state: string;
  state_id: number;
  stateValue: string;
  base_code: string;
  base_marking: string;
  plant: string;
}

interface IBoilReportData {
  rows: IBoilReportRow[];
  total: number;
}

interface IBoilReportRow {
  id: number;
  value: string;
  recordsCount: number;
  historiesCount: number;
  state: string;
  state_id: number;
  stateValue: string;
  base_code: string;
  base_marking: string;
  plant: string;
  firstBaseCheckTime: Date;
  lastBaseCheckTime: Date;
  lastPlugPassTime: Date;
}

interface IConveyor {
  id: number;
  value: string;
  barcode: string;
}

interface IConveyorUpdateDto {
  id: number;
  value: string;
  barcode: string | null;
}

interface BaseRow {
  code: string;
  marking: string;
}

interface BulkUpdateBasesDto {
  bases: BaseRow[];
}

interface PaginationStore {
  page: number;
  limit: number;
  total: number;
  increasePage: () => void;
  decreasePage: () => void;
  setTotal: (val: number) => void;
  setLimit: (val: number) => void;
  setPage: (val: number) => void;
}

interface IDocRow {
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
  stateTime: Date;
  isSet: boolean;
  isUpdated: boolean;
  history_note: string;
}

interface SummaryResponse {
  id: number;
  plantId: number;
  plant: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  records: IDocRow[];
}

interface ISummaryUploadData {
  plantId: string;
  summaryDate: string;
  update: boolean;
  rows: IXLSData[];
}

interface IXLSData {
  code1C: string;
  product: string;
  serie: string;
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

type CustomColorsVariants = "success" | "danger" | "warning" | "primary";
