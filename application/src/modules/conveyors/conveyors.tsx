import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import ConveyorsTable from "./conveyors-table";
import ConveyorEditModal from "./conveyors-edit-modal";
import ConveyorsFilter from "./conveyors-filter";
import ConveyorsPagination from "./conveyors-pagination";

export default function Conveyors() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Конвейеры"]} />
      <MainPageHeader pageTitle={"Конвейеры"} />
      <ConveyorsFilter />
      <ConveyorsTable />
      <ConveyorsPagination />
      <ConveyorEditModal />

      {/* <RecordsFilter />
      <RecordsTable />
      <RecordsHistoryModal />
      <NoteModal />
      <AddRecordModal /> */}
    </React.Fragment>
  );
}
