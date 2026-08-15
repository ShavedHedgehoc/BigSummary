import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useInventoriesPaginationStore } from "./store/use-inventories-pagination-store";
import { useInventories } from "./use-inventories";
import { useInventoriesFilterStore } from "./store/use-inventories-filter-store";
import InventoryDocsRow from "./inventories-row";

const commonThead = [
  { width: 64, value: "Дата" },
  { width: 64, value: "Площадка" },
  { width: 64, value: "Записей" },
  { width: 64, value: "Действия" },
];

export default function InventoriesTable() {
  const filter = useInventoriesFilterStore(useShallow((state) => state.filter));
  const page = useInventoriesPaginationStore(useShallow((state) => state.page));
  const limit = useInventoriesPaginationStore(useShallow((state) => state.limit));
  const total = useInventoriesPaginationStore(useShallow((state) => state.total));
  const setTotal = useInventoriesPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useInventoriesPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useInventories({ filter: filter, limit: limit, page: page });

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
      {isSuccess && data.rows.map((row) => <InventoryDocsRow row={row} key={row.id} />)}
    </TableLayout>
  );
}
