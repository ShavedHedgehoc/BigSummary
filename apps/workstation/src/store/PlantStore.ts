import { action, computed, makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

export interface IPlant {
  id: number;
  value: string;
}

export default class PlantStore {
  plant: IPlant | null = null;
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this);
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  setPlant(plant: IPlant) {
    this.plant = plant;
  }

  async fetchPlant(plantName: string) {
    try {
      this.setPending(true);
      const response = await $api.get(`/plants/${plantName}`);
      this.setPlant(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      await new Promise((r) => setTimeout(r, 500));
      this.setPending(false);
    }
  }
}
