import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import BoilsFilter from "./boils-filter";
import BoilsTable from "./boils-table";
import BoilsPagination from "./boils-pagination";
import BoilHistoryModal from "./boil-history-modal";
import NoteModal from "../../shared/components/note-modal/note-modal";
import AddBoilRecordModal from "./add-boil-record-modal";

export default function Boils() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Лаборатория", "Основы"]} />
      <MainPageHeader pageTitle={"Основы"} />
      <BoilsFilter />
      <BoilsTable />
      <BoilHistoryModal />
      <NoteModal />
      <AddBoilRecordModal />
      <BoilsPagination />
    </React.Fragment>
  );
}
