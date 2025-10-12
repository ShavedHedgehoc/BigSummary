import * as React from "react";
import TraceBatchWeightingsSummaryDetailHeader from "./trace-batch-weighting-summary-detail-header";
import TraceBatchWeightingsSummaryDetailTable from "./trace-batch-weightings-summary-detail-table";
import TraceBatchWeightingsSummaryDetailPagination from "./trace-batch-weighting-summary-detail-pagination";
import TraceBatchWeightingsSummaryDetailSubHeader from "./trace-batch-weightings-summary-detail-subheader";

export default function TraceBatchWeightingsSummaryDetail() {
  return (
    <React.Fragment>
      <TraceBatchWeightingsSummaryDetailHeader />
      <TraceBatchWeightingsSummaryDetailSubHeader />
      <TraceBatchWeightingsSummaryDetailTable />
      <TraceBatchWeightingsSummaryDetailPagination />
    </React.Fragment>
  );
}
