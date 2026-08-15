import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import ForemanTable from "./foreman-table";
import ForemanFilter from "./filter/foreman-filter";
import ForemanHistoryModal from "./foreman-history-modal";
import ForemanView from "./foreman-view";
import ForemanActionModal from "./foreman-action-modal";
import NoteModal from "../../shared/components/note-modal/note-modal";

export default function Foreman_new() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Мастер"]} />
      <MainPageHeader pageTitle={"Мастер"} />
      <ForemanFilter />
      <ForemanTable />
      <ForemanView />
      <ForemanHistoryModal />
      <ForemanActionModal />
      <NoteModal />
    </React.Fragment>
  );
}
