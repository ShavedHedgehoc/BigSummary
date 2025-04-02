import { Typography } from "@mui/joy";

import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { TimeReportRowData } from "../../../shared/api/services/record-service";

export default function TimeReportRow({ row }: { row: TimeReportRowData }) {
  return (
    <tr key={row.id}>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.conveyor}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.productId}</Typography>
      </td>

      <td style={{ width: 100, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.product}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.boil}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.plan}</Typography>
      </td>
      <td style={{ width: 100, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">
          {row.lastBaseCheck
            ? `${formatDateToString(row.lastBaseCheck)} ${formatTimeToString(row.lastBaseCheck)}`
            : "-"}
        </Typography>
      </td>
      <td style={{ width: 100, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">
          {row.lastPlugPass ? `${formatDateToString(row.lastPlugPass)} ${formatTimeToString(row.lastPlugPass)}` : "-"}
        </Typography>
      </td>

      <td style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.lastProductCheck ? formatTimeToString(row.lastProductCheck) : "-"}</Typography>
      </td>

      <td style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.lastProductPass ? formatTimeToString(row.lastProductPass) : "-"}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">
          {row.lastProductInProgress ? formatTimeToString(row.lastProductInProgress) : "-"}
        </Typography>
      </td>
      <td style={{ width: 100, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">
          {row.lastProductFinished ? formatTimeToString(row.lastProductFinished) : "-"}
        </Typography>
      </td>
    </tr>
  );
}
