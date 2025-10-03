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
    return row.res_fact
      ? row.res_plan
        ? row.res_plan === row.res_fact
          ? "product_pass"
          : "product_check"
        : "product_fail"
      : "product_fail";
  }

  return (
    <tr key={row.b_product_id ? `${row.b_product_id + row.batch_number}` : `${row.w_product_id + row.batch_number}`}>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState
          text={row.res_batch_date ? formatDateToString(row.res_batch_date) : "-"}
          state={currentState(row)}
        />
        {/* <Typography level="body-xs">{formatDateToString(row.res_batch_date)}</Typography> */}
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.plant_name ? row.plant_name : "-"} state={currentState(row)} />
        {/* <Typography level="body-xs">{row.plant_name}</Typography> */}
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.res_batch_name ? row.res_batch_name : "-"} state={currentState(row)} />
        {/* <Typography level="body-xs">{row.res_batch_name}</Typography> */}
      </td>

      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.b_product_id ? row.b_product_id : row.w_product_id} state={currentState(row)} />
        {/* <Typography level="body-xs">{row.b_product_id ? row.b_product_id : row.w_product_id}</Typography> */}
      </td>
      <td style={{ width: 120, textAlign: "left", padding: "12px 6px" }}>
        <TableState
          text={row.b_product_name ? row.b_product_name : row.w_product_name ? row.w_product_name : "-"}
          state={currentState(row)}
        />
        {/* <Typography level="body-xs">{row.b_product_name ? row.b_product_name : row.w_product_name}</Typography> */}
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
          disabled={!row.res_fact}
          onClick={() =>
            navigate(
              `${RouteNames.TRACE_WGHT_REPORT_DETAIL}?batch_name=${row.res_batch_name}&product_id=${row.w_product_id}`
            )
          }
        >
          <InfoOutlinedIcon />
        </TableIconButton>
      </td>

      <td style={{ width: 20, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.res_plan ? row.res_plan : "-"}</Typography>
      </td>
      <td style={{ width: 20, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.res_fact ? row.res_fact : "-"} state={currentState(row)} />
      </td>
    </tr>
  );
}
