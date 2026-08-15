import * as React from "react";
import TraceBatchsPagination from "./trace-batchs-pagination";
import TraceBatchsTable from "./trace-batchs-table";
import TraceBatchsFilter from "./filter/trace-batchs-filter";
import TraceBatchsHeader from "./trace-batchs-header";

export default function TraceBatchs() {
  return (
    <React.Fragment>
      <TraceBatchsHeader />
      <TraceBatchsFilter />
      <TraceBatchsTable />
      <TraceBatchsPagination />
    </React.Fragment>
  );
}
