import AuthStore from "./AuthStore";
import PlantsStore from "./PlantStore";
import SummaryStore from "./SummaryStore";
import HistoryStore from "./HistoryStore";
import DocStore from "./DocStore";
import EmployeeStore from "./EmployeeStore";

import RecordDetailStore from "./RecordDetailStore";
import HistoryTypeStore from "./HistoryTypeStore";
import BoilStore from "./BoilStore";
import RoleStore from "./RoleStore";
import UserStore from "./UserStore";
import BoilDetailStore from "./BoilDetailStore";
import NoteStore from "./NoteStore";

export default class RootStore {
  AuthStore;
  SummaryStore;
  PlantStore;
  HistoryStore;
  DocStore;

  EmployeeStore;
  RecordDetailStore;
  HistoryTypeStore;
  BoilStore;
  RoleStore;
  UserStore;
  BoilDetailStore;
  NoteStore;

  constructor() {
    this.AuthStore = new AuthStore();
    this.SummaryStore = new SummaryStore();
    this.PlantStore = new PlantsStore();
    this.HistoryStore = new HistoryStore();
    this.DocStore = new DocStore();
    this.EmployeeStore = new EmployeeStore();
    this.RecordDetailStore = new RecordDetailStore();
    this.HistoryTypeStore = new HistoryTypeStore();
    this.BoilStore = new BoilStore();
    this.RoleStore = new RoleStore();
    this.UserStore = new UserStore();
    this.BoilDetailStore = new BoilDetailStore();
    this.NoteStore = new NoteStore();
  }
}
