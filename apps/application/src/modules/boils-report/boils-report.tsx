import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";

import NoteModal from "../../shared/components/note-modal/note-modal";
import BoilsReportFilter from "./filter/boils-report-filter";
import BoilsReportPagination from "./boils-report-pagination";
import BoilsReportTable from "./table/boils-report-table";
import BoilsReportHistoryModal from "./history-modal/boils-report-history-modal";

export default function BoilsReport() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Отчеты", "Основы"]} />
      <MainPageHeader pageTitle={"Основы"} />
      <BoilsReportFilter />
      <BoilsReportTable />
      <BoilsReportHistoryModal />
      <NoteModal />
      <BoilsReportPagination />
    </React.Fragment>
  );
}
