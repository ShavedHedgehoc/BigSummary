import * as React from "react";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";

// import RowComponent from "./conveyors-row";

import { useShallow } from "zustand/shallow";
import { useCansListPaginationStore } from "./store/use-cans-list-pagination-store";
import { useCansList } from "./use-cans-list";
import { useCansListFilterStore } from "./store/use-cans-list-filter-store";
import CansListRow from "./cans-list-row";

const commonThead: TheadProperties[] = [
  { width: 50, align: "center", value: "Ёмкость" },
  { width: 30, align: "center", value: "Объем" },
  { width: 80, align: "center", value: "Штрихкод" },
  { width: 80, align: "center", value: "Площадка" },
  { width: 110, align: "center", value: "Действия" },
];

export default function CansListTable() {
  const filter = useCansListFilterStore(useShallow((state) => state.filter));
  const page = useCansListPaginationStore(useShallow((state) => state.page));
  const limit = useCansListPaginationStore(useShallow((state) => state.limit));
  const total = useCansListPaginationStore(useShallow((state) => state.total));
  const setTotal = useCansListPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useCansListPaginationStore(useShallow((state) => state.setPage));

  const { isPending, data, isSuccess } = useCansList({ filter: filter, limit: limit, page: page });

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
      {isSuccess && data.rows.map((row) => <CansListRow row={row} key={row.CanPK} />)}
      {/* {isSuccess && data.rows.map((row) => <div key={row.CanPK}>{row.CanName}</div>)} */}
    </TableLayout>
  );
}
