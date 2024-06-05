import EmployeeStore from "./EmployeeStore";
import HistoriesStore from "./HistoriesStore";
import RecordsStore from "./RecordsStore";
import HealthStore from "./HealthStore";
export default class RootStore {
  EmployeeStore;
  HistoriesStore;
  RecordsStore;
  HealthStore;

  constructor() {
    this.EmployeeStore = new EmployeeStore();
    this.HistoriesStore = new HistoriesStore();
    this.RecordsStore = new RecordsStore();
    this.HealthStore = new HealthStore();
  }
}
