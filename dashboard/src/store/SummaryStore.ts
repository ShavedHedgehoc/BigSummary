import { computed, makeAutoObservable } from "mobx";
import RecordService, { IPlant, IRecord } from "../services/SummaryService";

export default class SummaryStore {
  records = {} as IRecord[];
  pending = false;
  error = "";
  plants = {} as IPlant;

  constructor() {
    makeAutoObservable(this, {
      count: computed,
    });
  }

  get count() {
    return this.records.length;
  }

  setRecords(records: IRecord[] | []) {
    this.records = [...records];
  }

  setPlant(plants: IPlant) {
    this.plants = plants;
  }
  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async fetchRecords(plantId: number) {
    try {
      this.setPending(true);
      const response = await RecordService.getRecords(plantId);
      this.setRecords(response.data.records);
      this.setPlant(response.data.plants);
    } catch (error) {
      console.log(error);
    } finally {
      this.setPending(false);
    }
  }
}
