import { Typography } from "@mui/joy";
import { ITraceBatchWghtReportRowData } from "../../shared/api/services/trace-batchs-service";
import { TableState } from "../../shared/ui/table-state";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../shared/router/route-names";

import { TableIconButton } from "../../shared/ui/table-icon-button";

export default function TraceBatchWghtReportTableRow({ row }: { row: ITraceBatchWghtReportRowData }) {
  const navigate = useNavigate();
  function currentState(row: ITraceBatchWghtReportRowData) {
    return row.fact_q
      ? row.plan_q
        ? row.plan_q === row.fact_q
          ? "product_pass"
          : "product_check"
        : "product_fail"
      : "product_fail";
  }

  return (
    <tr key={`${row.product_id + row.batch_id}`}>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.batch_date ? formatDateToString(row.batch_date) : "-"} state={currentState(row)} />
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.plant ? row.plant : "-"} state={currentState(row)} />
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.batch_name} state={currentState(row)} />
      </td>

      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.product_id} state={currentState(row)} />
      </td>
      <td style={{ width: 120, textAlign: "left", padding: "12px 6px" }}>
        <TableState text={row.product_name} state={currentState(row)} />
      </td>
      <td style={{ width: 20, textAlign: "center", padding: "12px 6px" }}>
        <TableIconButton
          color={
            currentState(row) === "product_pass"
              ? "success"
              : currentState(row) === "product_check"
              ? "warning"
              : "danger"
          }
          variant="plain"
          size="sm"
          disabled={!row.fact_q}
          onClick={() =>
            navigate(`${RouteNames.TRACE_WGHT_REPORT_DETAIL}?batch_name=${row.batch_name}&product_id=${row.product_id}`)
          }
        >
          <InfoOutlinedIcon />
        </TableIconButton>
      </td>

      <td style={{ width: 20, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.plan_q}</Typography>
      </td>
      <td style={{ width: 20, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.fact_q} state={currentState(row)} />
      </td>
    </tr>
  );
}
