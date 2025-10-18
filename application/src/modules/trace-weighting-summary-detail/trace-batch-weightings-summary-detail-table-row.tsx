import { Typography } from "@mui/joy";

import { ITraceWeightingsSummaryDetailRow } from "../../shared/api/services/trace-batchs-service";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";

export default function TraceBatchWeightingsSummaryDetailTableRow({
  row,
  index,
}: {
  row: ITraceWeightingsSummaryDetailRow;
  index: number;
}) {
  return (
    <tr key={row.w_id}>
      <td style={{ width: 10, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{index + 1}</Typography>
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.w_product_id}</Typography>
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.w_batch_name}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "left", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.w_product_name}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.w_quantity}</Typography>
      </td>
      <td style={{ width: 60, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatDateToString(row.w_date)}</Typography>
      </td>
      <td style={{ width: 60, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatTimeToString(row.w_date)}</Typography>
      </td>
    </tr>
  );
}
