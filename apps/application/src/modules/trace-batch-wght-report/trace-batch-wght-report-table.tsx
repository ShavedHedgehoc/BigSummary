import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useTraceBatchWghtReportFilterStore } from "./store/use-trace-batch-wght-report-filter-store";
import { useTraceBatchWghtReportPaginationStore } from "./store/use-trace-batch-wght-report-pagination-store";
import { useTraceBatchWghtReport } from "./use-trace-batch-wght-report";
import TraceBatchWghtReportTableRow from "./trace-batch-wght-report-table-row";

const commonThead = [
  { width: 30, value: "Дата" },
  { width: 30, value: "Площадка" },
  { width: 30, value: "Партия" },

  { width: 30, value: "Код 1С" },
  { width: 120, value: "Наименование" },
  { width: 20, value: "-" },
  { width: 20, value: "План" },
  { width: 20, value: "Факт" },
];

export default function TraceBatchWghtReportTable() {
  const filter = useTraceBatchWghtReportFilterStore(useShallow((state) => state.filter));
  const page = useTraceBatchWghtReportPaginationStore(useShallow((state) => state.page));
  const limit = useTraceBatchWghtReportPaginationStore(useShallow((state) => state.limit));
  const total = useTraceBatchWghtReportPaginationStore(useShallow((state) => state.total));
  const setTotal = useTraceBatchWghtReportPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useTraceBatchWghtReportPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useTraceBatchWghtReport({ filter: filter, limit: limit, page: page });

  //REmove useeffects

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
        data.rows.map((row) => <TraceBatchWghtReportTableRow row={row} key={`${row.product_id + row.BatchNumber}`} />)}
    </TableLayout>
  );
}
