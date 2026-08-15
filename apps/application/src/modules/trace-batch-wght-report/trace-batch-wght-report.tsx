import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import TraceBatchWghtReportPagination from "./trace-batch-wght-report-pagination";
import TraceBatchWghtReportTable from "./trace-batch-wght-report-table";
import TraceBatchWghtReportFilter from "./filter/trace-batch-wght-report-filter";

export default function TraceBatchWghtReport() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Весовой участок", "Отчет по взвешиваниям"]} />
      <MainPageHeader pageTitle={"Отчет по взвешиваниям"} />
      <TraceBatchWghtReportFilter />
      <TraceBatchWghtReportTable />
      <TraceBatchWghtReportPagination />
    </React.Fragment>
  );
}
