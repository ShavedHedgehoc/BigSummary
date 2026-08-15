import TableLayout from "../../shared/layouts/table-layout";
import TraceBatchsDetailSummaryTableRow from "./trace-batch-detail-summary-table-row";
import { ITraceBatchDetailData } from "../../shared/api/services/trace-batchs-service";

const commonThead = [
  { width: 60, value: "Код 1С" },
  { width: 100, value: "Наименование" },
  //   { width: 20, value: "" },
  { width: 40, value: "План" },
  { width: 40, value: "Факт" },
];

export default function TraceBatchsDetailSummaryTable({ data }: { data: ITraceBatchDetailData }) {
  return (
    <TableLayout thead={commonThead}>
      {data && data.summary_data.map((row) => <TraceBatchsDetailSummaryTableRow row={row} key={row.b_product_id} />)}
    </TableLayout>
  );
}
