import * as React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";
import ConveyorsTable from "./conveyors-table";
import ConveyorEditModal from "./conveyors-edit-modal";

export default function Conveyors() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Конвейеры"]} />
      <MainPageHeader pageTitle={"Конвейеры"} />
      <ConveyorsTable />
      <ConveyorEditModal />
      {/* <RecordsFilter />
      <RecordsTable />
      <RecordsHistoryModal />
      <NoteModal />
      <AddRecordModal /> */}
    </React.Fragment>
  );
}
