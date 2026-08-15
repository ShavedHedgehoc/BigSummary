import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import DashFilter from "./dash-filter";
import DashView from "./dash-view";
import DashHistoryModal from "./dash-history-modal";
import NoteModal from "../../shared/components/note-modal/note-modal";

export default function Dash() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Текущая сводка"]} />
      <MainPageHeader pageTitle={"Текущая сводка"} />
      <DashFilter />
      <DashView />
      <DashHistoryModal />
      <NoteModal />
    </React.Fragment>
  );
}
