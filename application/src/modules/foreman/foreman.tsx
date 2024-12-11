import * as React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";
import ForemanTable from "./foreman-table";
import ForemanFilter from "./foreman-filter";
import ForemanHistoryModal from "./foreman-history-modal";
import ForemanList from "./foreman-list";

export default function Foreman_new() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Мастер"]} />
      <MainPageHeader pageTitle={"Мастер"} />
      <ForemanFilter />
      <ForemanTable />
      <ForemanList />
      <ForemanHistoryModal />
      {/* <BoilsFilter />
      <BoilsTable />
      <BoilHistoryModal />
      <NoteModal />
      <AddBoilRecordModal />
      <BoilsPagination /> */}
    </React.Fragment>
  );
}
