import * as React from "react";
import { useShallow } from "zustand/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useTraceBatchsFilterStore } from "./store/use-trace-batchs-filter-store";
import { useTraceBatchsPaginationStore } from "./store/use-trace-batchs-pagination-store";
import { useTraceBatchs } from "./use-trace-batchs";
import TraceBatchsTableRow from "./trace-batchs-table-row";

const commonThead = [
  { width: 60, value: "Варка" },
  { width: 80, value: "Артикул" },
  { width: 60, value: "Дата варки" },
  { width: 60, value: "Площадка" },
  { width: 80, value: "Действия" },
];

export default function TraceBatchsTable() {
  const filter = useTraceBatchsFilterStore(useShallow((state) => state.filter));
  const page = useTraceBatchsPaginationStore(useShallow((state) => state.page));
  const limit = useTraceBatchsPaginationStore(useShallow((state) => state.limit));
  const total = useTraceBatchsPaginationStore(useShallow((state) => state.total));
  const setTotal = useTraceBatchsPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useTraceBatchsPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useTraceBatchs({ filter: filter, limit: limit, page: page });

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
      {isSuccess && data.rows.map((row) => <TraceBatchsTableRow row={row} key={row.batch_id} />)}
    </TableLayout>
  );
}
