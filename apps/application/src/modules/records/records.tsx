import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import RecordsFilter from "./records-filter";
import RecordsTable from "./records-table";
import NoteModal from "../../shared/components/note-modal/note-modal";
import AddRecordModal from "./add-product-record-modal";
import RecordsHistoryModal from "./records-history-modal";

export default function Records() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Лаборатория", "Продукты"]} />
      <MainPageHeader pageTitle={"Продукты"} />
      <RecordsFilter />
      <RecordsTable />
      <RecordsHistoryModal />
      <NoteModal />
      <AddRecordModal />
    </React.Fragment>
  );
}
