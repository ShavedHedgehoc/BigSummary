import { action, makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

export interface IRecord {
  id: number;
  doc_id: number;
  productId: number;
  boilId: number;
  apparatusId: number;
  canId: number;
  conveyorId: number;
  plan: number;
  bbf: string;
  note: string;
  workshopId: number;
  isSet: boolean;
}

export interface FetchRelatedRecordsDto {
  plant_id: number;
  boil_value: string;
  code: string;
}

export default class RelatedRecordsStore {
  records: IRecord[] = [];
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this, {
      fetchRelatedRecords: action,
    });
  }

  setRecords(records: IRecord[]) {
    this.records = records;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async fetchRelatedRecords(dto: FetchRelatedRecordsDto) {
    try {
      this.setError("");
      this.setPending(true);
      const responce = await $api.post(`/records/related`, dto);
      this.setRecords(responce.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      this.setPending(false);
    }
  }

  clearRelatedRecords() {
    this.setRecords([]);
  }
}
