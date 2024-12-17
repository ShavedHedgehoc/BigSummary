import * as React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";
import ForemanTable from "./foreman-table";
import ForemanFilter from "./foreman-filter";
import ForemanHistoryModal from "./foreman-history-modal";
import ForemanView from "./foreman-view";
import ForemanActionModal from "./foreman-action-modal";

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
    </React.Fragment>
  );
}
