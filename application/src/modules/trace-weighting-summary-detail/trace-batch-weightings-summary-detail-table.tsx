import * as React from "react";
import TableLayout from "../../shared/layouts/table-layout";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useTraceBatchWeightingsSummaryDetail } from "./use-trace-batch-weightings-summary-detail";
import { useSearchParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import { GetWeightingsSummaryDetailDto } from "../../shared/api/services/trace-batchs-service";
import TraceBatchWeightingsSummaryDetailTableRow from "./trace-batch-weightings-summary-detail-table-row";
import { useTraceBatchWeightingsSummaryDetailPaginationStore } from "./store/use-trace-batch-weightings-summary-detail-pagination-store";
import { useShallow } from "zustand/shallow";

const commonThead: TheadProperties[] = [
  { width: 10, value: "", align: "center" },
  { width: 30, value: "Код 1С" },
  { width: 30, value: "Партия" },
  { width: 80, value: "Наименование" },
  { width: 40, value: "Количество" },
  { width: 60, value: "Дата" },
  { width: 60, value: "Время" },
];

export default function TraceBatchWeightingsSummaryDetailTable() {
  const [searchParams] = useSearchParams();
  const author_id: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_AUTHOR_ID);
  const startDate: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_START_DATE);
  const endDate: string | null = searchParams.get(Params.TRACE_BATCH_WGHT_SUMMARY_END_DATE);
  const page = useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.page));
  const limit = useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.limit));
  const total = useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.total));
  const setTotal = useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.setPage));

  const dto: GetWeightingsSummaryDetailDto = {
    author_id: Number(author_id),
    startDate: startDate,
    endDate: endDate,
    page: page,
    limit: limit,
  };

  const { isPending, data, isSuccess } = useTraceBatchWeightingsSummaryDetail(dto);
  React.useEffect(() => {
    if (data && data.total !== total) {
      setTotal(data.total);
      setPage(1);
    }
  }, [data?.total]);

  React.useEffect(() => {
    if (limit) {
      setPage(1);
    }
  }, [limit]);

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.rows.length === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess &&
        data.rows.map((row, index) => (
          <TraceBatchWeightingsSummaryDetailTableRow row={row} index={index} key={row.w_id} />
        ))}
    </TableLayout>
  );
}
