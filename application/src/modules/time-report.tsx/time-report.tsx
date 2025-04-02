import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import TimeReportFilter from "./filter/time-report-filter";
import TimeReportTable from "./table/time-report-table";

export default function TimeReport() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Отчеты", "Время в сводках"]} />
      <MainPageHeader pageTitle={"Время в сводках"} />
      <TimeReportFilter />
      <TimeReportTable />
    </React.Fragment>
  );
}
