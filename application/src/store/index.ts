import AuthStore from "./AuthStore";
import PlantsStore from "./PlantStore";
import SummaryStore from "./SummaryStore";
import HistoryStore from "./HistoryStore";
import DocStore from "./DocStore";
import EmployeeStore from "./EmployeeStore";
import DocDetailStore from "./DocDetailStore";
import RecordDetailStore from "./RecordDetailStore";
import HistoryTypeStore from "./HistoryTypeStore";

export default class RootStore {
  AuthStore;
  SummaryStore;
  PlantStore;
  HistoryStore;
  DocStore;
  DocDetailStore;
  EmployeeStore;
  RecordDetailStore;
  HistoryTypeStore;

  constructor() {
    this.AuthStore = new AuthStore();
    this.SummaryStore = new SummaryStore();
    this.PlantStore = new PlantsStore();
    this.HistoryStore = new HistoryStore();
    this.DocStore = new DocStore();
    this.DocDetailStore = new DocDetailStore();
    this.EmployeeStore = new EmployeeStore();
    this.RecordDetailStore = new RecordDetailStore();
    this.HistoryTypeStore = new HistoryTypeStore();
  }
}
