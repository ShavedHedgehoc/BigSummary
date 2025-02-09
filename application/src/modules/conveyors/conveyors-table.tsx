import * as React from "react";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";

import { useConveyors } from "./use-conveyors";
import RowComponent from "./conveyors-row";
import { useConveyorsFilterStore } from "./store/use-conveyors-filter-store";
import { useConveyorsPaginationStore } from "./store/use-conveyors-pagination-store";
import { useShallow } from "zustand/shallow";

const commonThead: TheadProperties[] = [
  { width: 50, align: "center", value: "Конвейер" },
  { width: 80, align: "center", value: "Штрихкод" },
  { width: 110, align: "center", value: "Действия" },
];

export default function ConveyorsTable() {
  //   const filter = useRecordsFilterStore(useShallow((state) => state.filter));
  const filter = useConveyorsFilterStore(useShallow((state) => state.filter));
  const page = useConveyorsPaginationStore(useShallow((state) => state.page));
  const limit = useConveyorsPaginationStore(useShallow((state) => state.limit));
  const total = useConveyorsPaginationStore(useShallow((state) => state.total));
  const setTotal = useConveyorsPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useConveyorsPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useConveyors({ filter: filter, limit: limit, page: page });

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

  if (isSuccess && data.total === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.rows.map((row) => <RowComponent row={row} key={row.id} />)}
    </TableLayout>
  );
}
