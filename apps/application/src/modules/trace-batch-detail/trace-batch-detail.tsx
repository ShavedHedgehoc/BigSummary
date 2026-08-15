import * as React from "react";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import TraceBatchDetailHeader from "./trace-batch-detail-header";

import TraceBatchsDetailSummaryTable from "./trace-batch-detail-summary-table";
import { useTraceBatchDetail } from "./use-trace-batch-detail";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";

export default function TraceBatchDetail() {
  const params = useParams<Params.TRACE_BATCH_PARAMS>();
  const batch_id: string | undefined = params.batch_id;

  const { isPending, data, isSuccess } = useTraceBatchDetail(batch_id);

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.summary_data.length === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <React.Fragment>
      <TraceBatchDetailHeader />
      {isSuccess && data && <TraceBatchsDetailSummaryTable data={data} />}
    </React.Fragment>
  );
}
