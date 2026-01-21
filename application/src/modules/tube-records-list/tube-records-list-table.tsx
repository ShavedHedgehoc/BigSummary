import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import TableLayout from "../../shared/layouts/table-layout";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useTubeRecordsListFilterStore } from "./store/use-tube-records-list-filter-store";
import { useTubeRecordsListPaginationStore } from "./store/use-tube-records-list-pagination-store";
import { useTubeRecordsList } from "./use-tube-records-list";
import TubeRecordsListRow from "./tube-records-list-row";

const commonThead: TheadProperties[] = [
  { width: 40, value: "Дата", align: "center", padding: " 12px 24px" },
  { width: 40, value: "Конвейер" },
  { width: 40, value: "Партия" },
  { width: 40, value: "Код 1С" },
  { width: 90, value: "Артикул", align: "left" },
  { width: 200, value: "Наименование", align: "left" },
  { width: 40, value: "План" },
  { width: 50, value: "Статус" },
  { width: 40, value: "Записей" },
  { width: 50, value: "Действия", padding: " 12px 36px" },
];

export default function TubeRecordsListTable() {
  const filter = useTubeRecordsListFilterStore(useShallow((state) => state.filter));
  const page = useTubeRecordsListPaginationStore(useShallow((state) => state.page));
  const limit = useTubeRecordsListPaginationStore(useShallow((state) => state.limit));
  const total = useTubeRecordsListPaginationStore(useShallow((state) => state.total));
  const setTotal = useTubeRecordsListPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useTubeRecordsListPaginationStore(useShallow((state) => state.setPage));

  const { isPending, data, isSuccess } = useTubeRecordsList({ filter: filter, limit: limit, page: page });

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
      {isSuccess && data.rows.map((row) => <TubeRecordsListRow row={row} key={row.id} />)}
    </TableLayout>
  );
}
