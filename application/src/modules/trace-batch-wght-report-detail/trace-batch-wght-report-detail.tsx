import * as React from "react";
import { useSearchParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import { FetchTraceBatchWghtReportDetailDto } from "../../shared/api/services/trace-batchs-service";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import TraceBatchWghtReportDetailTable from "./trace-batch-wght-report-detail-table";
import TraceBatchWghtReportDetailHeader from "./trace-batch-wght-report-detail-header";
import TraceBatchWghtReportDetailDeleteModal from "./trace-batch-wght-report-detail-delete-modal";

export default function TraceBatchWghtReportDetail() {
  const [searchParams] = useSearchParams();

  const batchName: string | null = searchParams.get(Params.TRACE_BATCH_PARAMS_DETAIL_BATCH);
  const productId: string | null = searchParams.get(Params.TRACE_BATCH_PARAMS_DETAIL_PRODUCT);

  if (!(batchName && productId)) {
    return <TableNotFoundComponent />;
  }
  const dto: FetchTraceBatchWghtReportDetailDto = {
    batchName: batchName,
    productId: productId,
  };

  return (
    <React.Fragment>
      <TraceBatchWghtReportDetailHeader dto={dto} />
      <TraceBatchWghtReportDetailTable dto={dto} />
      <TraceBatchWghtReportDetailDeleteModal />
    </React.Fragment>
  );
}
