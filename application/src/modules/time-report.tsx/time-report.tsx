import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import TimeReportFilter from "./filter/time-report-filter";
import TimeReportTable from "./table/time-report-table";
import TimeReportHistoryModal from "./history-modal/time-report-history-modal";
import NoteModal from "../../shared/components/note-modal/note-modal";

export default function TimeReport() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Отчеты", "Тайминг сводок"]} />
      <MainPageHeader pageTitle={"Тайминг сводок"} />
      <TimeReportFilter />
      <TimeReportTable />
      <TimeReportHistoryModal />
      <NoteModal />
    </React.Fragment>
  );
}
