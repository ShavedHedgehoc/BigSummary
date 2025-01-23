import { useShallow } from "zustand/shallow";
import TableLayout from "../../shared/layouts/table-layout";

import TableLoaderComponent from "../../components/tables/TableLoaderComponent";
import TableNotFoundComponent from "../../components/tables/TableNotFoundComponent";

import { useDocumentDetail } from "./use-document-detail";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import { useDocumentDetailFilterStore } from "./store/use-document-detail-filter-store";
import DocumentDetailRow from "./document-detail-row";

const commonThead: TheadProperties[] = [
  { width: 50, align: "center", value: "Код 1С" },
  { width: 64, align: "center", value: "Артикул" },
  { width: 50, align: "center", value: "Партия" },
  { width: 50, align: "center", value: "План" },
  { width: 50, align: "center", value: "Аппарат" },
  { width: 50, align: "center", value: "Емкость" },
  { width: 50, align: "center", value: "Конвейер" },
  { width: 200, align: "center", value: "Примечание" },
  { width: 110, align: "center", value: "Статус" },
  { width: 80, align: "center", value: "..." },
];

export default function DocumentDetailTable() {
  const params = useParams<Params.SUMMARY_PARAMS>();
  const doc_id: string | undefined = params.summary_id;
  const filter = useDocumentDetailFilterStore(useShallow((state) => state.filter));

  const { isPending, data, isSuccess } = useDocumentDetail({ doc_id: doc_id, filter: filter });

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.records.length === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.records.map((row) => <DocumentDetailRow row={row} key={row.id} />)}
    </TableLayout>
  );
}
