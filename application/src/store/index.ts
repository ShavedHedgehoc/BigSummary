import AuthStore from "./AuthStore";
import PlantsStore from "./PlantStore";
import SummaryStore from "./SummaryStore";
import HistoryStore from "./HistoryStore";
import DocStore from "./DocStore";
import EmployeeStore from "./EmployeeStore";

export default class RootStore {
  AuthStore;
  SummaryStore;
  PlantStore;
  HistoryStore;
  DocStore;
  EmployeeStore;

  constructor() {
    this.AuthStore = new AuthStore();
    this.SummaryStore = new SummaryStore();
    this.PlantStore = new PlantsStore();
    this.HistoryStore = new HistoryStore();
    this.DocStore = new DocStore();
    this.EmployeeStore = new EmployeeStore();
  }
}