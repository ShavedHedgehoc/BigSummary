import { Typography } from "@mui/joy";
import { ITraceBatchDetailSummaryRow } from "../../shared/api/services/trace-batchs-service";
import { TableState } from "../../shared/ui/table-state";

export default function TraceBatchsDetailSummaryTableRow({ row }: { row: ITraceBatchDetailSummaryRow }) {
  function currentState(row: ITraceBatchDetailSummaryRow) {
    return row.fact_q
      ? row.plan_q
        ? row.plan_q === row.fact_q
          ? "product_pass"
          : "product_check"
        : "product_fail"
      : "product_fail";
  }
  return (
    <tr key={row.b_product_id}>
      <td style={{ width: 60, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.b_product_id ? row.b_product_id : row.w_product_id} state={currentState(row)} />
      </td>
      <td style={{ width: 100, textAlign: "left", padding: "12px 6px" }}>
        <TableState
          text={row.b_product_name ? row.b_product_name : row.w_product_name ? row.w_product_name : "-"}
          state={currentState(row)}
        />
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.plan_q ? row.plan_q : "-"}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <TableState text={row.fact_q ? row.fact_q : "-"} state={currentState(row)} />
      </td>
    </tr>
  );
}
