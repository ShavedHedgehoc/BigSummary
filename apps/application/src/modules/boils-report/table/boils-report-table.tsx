import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import TableLayout from "../../../shared/layouts/table-layout";
import TableLoaderComponent from "../../../shared/components/table-loader";
import TableNotFoundComponent from "../../../shared/components/table-not-found";
import BoilsReportRow from "./boils-report-row";

import { useBoilsReportPaginationStore } from "../store/use-boils-report-pagination-store";
import { useBoilsReport } from "../use-boils-report";
import { useBoilsReportFilterStore } from "../store/use-boils-report-filter-store";

const commonThead: TheadProperties[] = [
  { width: 64, value: "Партия" },
  { width: 64, value: "Артикул" },
  { width: 64, value: "Код 1C" },
  { width: 50, value: "Площадка" },
  { width: 50, value: "В сводках" },
  { width: 50, value: "Записей" },
  { width: 96, value: "Статус" },
  { width: 80, value: "На допуск" },
  { width: 80, value: "Всего на допуск" },
  { width: 30, value: "..." },
];

export default function BoilsReportTable() {
  const filter = useBoilsReportFilterStore(useShallow((state) => state.filter));
  const page = useBoilsReportPaginationStore(useShallow((state) => state.page));
  const limit = useBoilsReportPaginationStore(useShallow((state) => state.limit));
  const total = useBoilsReportPaginationStore(useShallow((state) => state.total));
  const setTotal = useBoilsReportPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useBoilsReportPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useBoilsReport({ filter: filter, limit: limit, page: page });

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
      {isSuccess && data.rows.map((row) => <BoilsReportRow row={row} key={row.id} />)}
    </TableLayout>
  );
}
