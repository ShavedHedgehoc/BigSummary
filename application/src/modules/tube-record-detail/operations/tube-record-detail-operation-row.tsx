import { Typography } from "@mui/joy";
import { TubeRecordDetailOperation } from "../../../shared/api/services/tube-records-service";
import { formatDateToString, formatTimeToString, msToTime } from "../../../shared/helpers/date-time-formatters";

export default function TubeRecordsDetailOperationRow({
  row,
  index,
}: {
  row: TubeRecordDetailOperation;
  index: number;
}) {
  return (
    <tr key={row.id}>
      <td style={{ width: 10, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{index + 1}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatDateToString(row.createdAt)}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatTimeToString(row.createdAt)}</Typography>
      </td>

      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.operation_value}</Typography>
      </td>
      <td style={{ width: 400, flexGrow: 1, textAlign: "left", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.operation_description}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.idle_time ? msToTime(row.idle_time) : "Выполняется"}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "left", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.employee}</Typography>
      </td>
    </tr>
  );
}
