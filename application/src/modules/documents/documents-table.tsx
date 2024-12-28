import * as React from "react";
import { useShallow } from "zustand/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../components/tables/TableLoaderComponent";
import TableNotFoundComponent from "../../components/tables/TableNotFoundComponent";
import { useDocumentsFilterStore } from "./store/use-documents-filter-store";
import { useDocumentsPaginationStore } from "./store/use-documents-pagination-store";
import { useDocuments } from "./use-documents";
import DocumentsRow from "./documents-row";

const commonThead = [
  { width: 64, value: "Дата" },
  { width: 64, value: "Площадка" },
  { width: 64, value: "Строк сводки" },
  { width: 64, value: "Записей" },
  { width: 64, value: "Действия" },
];

export default function DocumentsTable() {
  const filter = useDocumentsFilterStore(useShallow((state) => state.filter));
  const page = useDocumentsPaginationStore(useShallow((state) => state.page));
  const limit = useDocumentsPaginationStore(useShallow((state) => state.limit));
  const total = useDocumentsPaginationStore(useShallow((state) => state.total));
  const setTotal = useDocumentsPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useDocumentsPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useDocuments({ filter: filter, limit: limit, page: page });

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
      {isSuccess && data.rows.map((row) => <DocumentsRow row={row} key={row.id} />)}
    </TableLayout>
  );
}
