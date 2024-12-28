import * as React from "react";
import { useShallow } from "zustand/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../components/tables/TableLoaderComponent";
import TableNotFoundComponent from "../../components/tables/TableNotFoundComponent";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";
import { useBoils } from "./use-boils";
import RowComponent from "./boils-row";
import { useBoilsPaginationStore } from "./store/use-boils-pagination-store";

const commonThead: TheadProperties[] = [
  { width: 64, value: "Партия" },
  { width: 64, value: "Артикул" },
  { width: 64, value: "Код 1C" },
  { width: 50, value: "Площадка" },
  { width: 50, value: "В сводках" },
  { width: 50, value: "Записей" },
  { width: 96, value: "Статус" },
  { width: 30, value: "..." },
  { width: 80, value: "Продолжение" },
  { width: 80, value: "Корректировка" },
  { width: 70, value: "Допуск" },
  { width: 60, value: "Брак" },
];

export default function BoilsTable() {
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));
  const page = useBoilsPaginationStore(useShallow((state) => state.page));
  const limit = useBoilsPaginationStore(useShallow((state) => state.limit));
  const total = useBoilsPaginationStore(useShallow((state) => state.total));
  const setTotal = useBoilsPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useBoilsPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useBoils({ filter: filter, limit: limit, page: page });

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

  if (isSuccess && data.total === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.rows.map((row) => <RowComponent row={row} key={row.id} />)}
    </TableLayout>
  );
}
