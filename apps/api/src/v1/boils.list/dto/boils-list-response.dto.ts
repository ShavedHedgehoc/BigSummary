export class BoilsListRow {
  id: number;
  value: string;
  base_id: number | null;
  letter: string | null;
  number: string;
  year: string;
  base_code: string | null;
  base_marking: string | null;
  recordsCount: number;
  historiesCount: number;
  state: string;
  stateValue: string;
}
export class BoilsListResponse {
  rows: BoilsListRow[];
  total: number;
}
