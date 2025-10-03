import { ITraceBatchWghtReportDetailData } from "../../shared/api/services/trace-batchs-service";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { TableIconButton } from "../../shared/ui/table-icon-button";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";
import { TableState } from "../../shared/ui/table-state";

export default function TraceBatchWghtReportDetailTableRow({ row }: { row: ITraceBatchWghtReportDetailData }) {
  return (
    <tr key={row.weighting_pk}>
      <td style={{ width: 20, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.product_id} state={row.l_date !== null ? "success" : ""} />
      </td>
      <td style={{ width: 100, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.product_name} state={row.l_date !== null ? "success" : ""} />
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.lot_name} state={row.l_date !== null ? "success" : ""} />
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.quantity} state={row.l_date !== null ? "success" : ""} />
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.author} state={row.l_date !== null ? "success" : ""} />
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={formatDateToString(row.w_date)} state={row.l_date !== null ? "success" : ""} />
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={formatTimeToString(row.w_date)} state={row.l_date !== null ? "success" : ""} />
      </td>
      <td style={{ width: 20, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.records} state={row.records > 1 ? "danger" : "success"} />
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.l_date ? "Да" : "Нет"} state={row.l_date !== null ? "success" : ""} />
      </td>
      <td style={{ width: 20, textAlign: "center", padding: "12px 6px" }}>
        <TableIconButton color="danger" disabled={row.l_date !== null}>
          <DeleteOutlinedIcon />
        </TableIconButton>
      </td>
    </tr>
  );
}
