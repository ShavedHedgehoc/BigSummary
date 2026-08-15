import * as React from "react";
import TraceBatchWeightingsSummaryHeader from "./trace-batch-weightings-summary-header";
import TraceBatchsWeightingsSummaryFilter from "./filter/trace-batch-weightings-summary-filter";
import TraceBatchWeightingsSummaryTable from "./trace-batch-weightings-summary-table";

export default function TraceBatchWeightingsSummary() {
  return (
    <React.Fragment>
      <TraceBatchWeightingsSummaryHeader />
      <TraceBatchsWeightingsSummaryFilter />
      <TraceBatchWeightingsSummaryTable />
    </React.Fragment>
  );
}
