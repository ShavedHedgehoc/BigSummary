import { computed, makeAutoObservable } from "mobx";
import SummaryService, { IRecord } from "../services/SummaryService";
import { IPlant } from "../services/PlantService";
import handleError from "../http/handleError";
import { ISummaryUploadData } from "../components/pages/planner/SummaryUpload";

export default class SummaryStore {
  records = {} as IRecord[];
  pending = false;
  recordPending = false;
  error = {} as string[];
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

  setRecordPending(bool: boolean) {
    this.recordPending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchRecords(plantId: string) {
    try {
      this.setPending(true);
      this.setError([]);
      this.setRecords([]);

      const response = await SummaryService.getRecords(plantId);
      this.setRecords([...response.data.records]);
      this.setPlant(response.data.plants);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }

  async fetchDocs() {
    try {
      this.setPending(true);
      this.setError([]);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }

  async uploadData(data: ISummaryUploadData) {
    try {
      this.setPending(true);
      this.setError([]);
      await SummaryService.bulkCreateRecords(data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
      console.log(errValue);
    } finally {
      this.setPending(false);
    }
  }
}
