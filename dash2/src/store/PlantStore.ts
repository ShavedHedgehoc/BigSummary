import { makeAutoObservable } from "mobx";
import { IPlant } from "../types/plant";
import PlantService from "../services/PlantService";
import handleError from "../http/handleError";

export default class PlantStore {
  plants = {} as IPlant[];
  pending = false;
  error = {} as string[];
  pendingComplete = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPlants(plants: IPlant[]) {
    this.plants = [...plants];
  }
  setPending(bool: boolean) {
    this.pending = bool;
  }

  setPendingComplete(bool: boolean) {
    this.pendingComplete = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchPlants() {
    try {
      this.setPending(true);
      this.setPendingComplete(false);
      const response = await PlantService.getPlants();
      this.setPlants(response.data);
      this.setPendingComplete(true);
    } catch (error) {
      // this.setPlants({} as IPlant[]);
      const errValue = handleError(error);
      if (typeof errValue === "object") {
        this.setError([...errValue]);
      } else {
        this.setError([errValue]);
      }
    } finally {
      this.setPending(false);
    }
  }
}
