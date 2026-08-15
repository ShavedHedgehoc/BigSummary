import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useTrademarksFilterStore } from "./store/use-trademarks-filter-store";
import { useTrademarksPaginationStore } from "./store/use-trademarks-pagination-store";
import TrademarksTableRow from "./trademarks-table-row";
import { useTrademarks } from "./use-terademarks";

const commonThead = [
  { width: 80, value: "Торговое название" },
  { width: 48, value: "Код 1С" },
  { width: 120, value: "Наименование" },
];

export default function TrademarksTable() {
  const filter = useTrademarksFilterStore(useShallow((state) => state.filter));
  const page = useTrademarksPaginationStore(useShallow((state) => state.page));
  const limit = useTrademarksPaginationStore(useShallow((state) => state.limit));
  const total = useTrademarksPaginationStore(useShallow((state) => state.total));
  const setTotal = useTrademarksPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useTrademarksPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useTrademarks({ filter: filter, limit: limit, page: page });

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
      {isSuccess && data.rows.map((row) => <TrademarksTableRow row={row} key={row.trademark_name} />)}
    </TableLayout>
  );
}
