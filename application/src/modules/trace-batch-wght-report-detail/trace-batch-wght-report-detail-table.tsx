import TableLayout from "../../shared/layouts/table-layout";
import TableLoaderComponent from "../../shared/components/table-loader";
import TableNotFoundComponent from "../../shared/components/table-not-found";
import { useTraceBatchWghtReportDetail } from "./use-trace-batch-wght-report-detail";
import { FetchTraceBatchWghtReportDetailDto } from "../../shared/api/services/trace-batchs-service";
import TraceBatchWghtReportDetailTableRow from "./trace-batch-wght-report-detail-table-row";

const commonThead = [
  { width: 20, value: "Код 1С" },
  { width: 100, value: "Наименование" },
  { width: 50, value: "Партия" },
  { width: 30, value: "Количество" },
  { width: 50, value: "Взвесил" },
  { width: 30, value: "Дата" },
  { width: 30, value: "Время" },
  { width: 20, value: "Записей" },
  { width: 30, value: "Загружено" },
  { width: 20, value: "" },
];

export default function TraceBatchWghtReportDetailTable({ dto }: { dto: FetchTraceBatchWghtReportDetailDto }) {
  const { isPending, data, isSuccess } = useTraceBatchWghtReportDetail(dto);

  if (isPending) {
    return <TableLoaderComponent />;
  }

  if (isSuccess && data.length === 0) {
    return <TableNotFoundComponent />;
  }

  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.map((row) => <TraceBatchWghtReportDetailTableRow row={row} key={row.weighting_pk} />)}
    </TableLayout>
  );
}
