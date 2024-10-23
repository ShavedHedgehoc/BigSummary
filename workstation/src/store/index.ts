import EmployeeStore from "./EmployeeStore";
import HistoriesStore from "./HistoriesStore";
import RecordsStore from "./RecordsStore";
import HealthStore from "./HealthStore";
import PlantStore from "./PlantStore";
export default class RootStore {
  EmployeeStore;
  HistoriesStore;
  RecordsStore;
  HealthStore;
  PlantStore;

  constructor() {
    this.EmployeeStore = new EmployeeStore();
    this.HistoriesStore = new HistoriesStore();
    this.RecordsStore = new RecordsStore();
    this.HealthStore = new HealthStore();
    this.PlantStore = new PlantStore();
  }
}
