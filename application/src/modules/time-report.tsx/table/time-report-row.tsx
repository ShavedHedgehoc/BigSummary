import { Typography } from "@mui/joy";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { TimeReportRowData } from "../../../shared/api/services/record-service";
import { TableIconButton } from "../../../shared/ui/table-icon-button";
import { useTimeReportHistoryModalStore } from "../store/use-time-report-history-modal-store";
import { useShallow } from "zustand/shallow";



export default function TimeReportRow({ row }: { row: TimeReportRowData }) {
  const setOpen = useTimeReportHistoryModalStore(useShallow((state) => state.setOpen));
  const setRecordId = useTimeReportHistoryModalStore(useShallow((state) => state.setRecordId));
  const setTitle = useTimeReportHistoryModalStore(useShallow((state) => state.setTitle));

  const handleDetailButtonClick = () => {
    setRecordId(row.id);
    setTitle(`Историй статусов по продукту ${row.product}, партия - ${row.boil}`);
    setOpen(true);
  };

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
      <td style={{ width: 20, textAlign: "center", padding: "18px 6px" }}>
        <TableIconButton color="success" disabled={row.state === "-"} onClick={() => handleDetailButtonClick()}>
          <InfoOutlinedIcon />
        </TableIconButton>
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
