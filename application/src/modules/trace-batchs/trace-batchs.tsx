import * as React from "react";
import BreadCrumbHeader from "../../shared/components/headers/BreadCrumbHeader";
import MainPageHeader from "../../shared/components/headers/MainPageHeader";
import TraceBatchsPagination from "./trace-batchs-pagination";
import TraceBatchsTable from "./trace-batchs-table";
import TraceBatchsFilter from "./filter/trace-batchs-filter";

export default function TraceBatchs() {
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Прослеживаемость", "Варки"]} />
      <MainPageHeader pageTitle={"Варки"} />
      <TraceBatchsFilter />
      <TraceBatchsTable />
      <TraceBatchsPagination />
    </React.Fragment>
  );
}
