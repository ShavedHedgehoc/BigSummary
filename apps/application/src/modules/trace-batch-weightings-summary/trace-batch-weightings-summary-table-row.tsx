import Typography from "@mui/joy/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TableIconButton } from "../../shared/ui/table-icon-button";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";
import { ITraceWeightingsSummaryData } from "../../shared/api/services/trace-batchs-service";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../shared/router/route-names";
import { useTraceBatchWeightingsSummaryFilterStore } from "./store/use-trace-batch-weightings-summary-filter-store";
import { useShallow } from "zustand/react/shallow";

export default function TraceBatchWeightingsSummaryTableRow({ row }: { row: ITraceWeightingsSummaryData }) {
  const navigate = useNavigate();
  const filter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.filter));
  const handleInfoButtonClick = () => {
    navigate(
      `${RouteNames.TRACE_WGHT_SUMMARY_DETAIL}?author_name=${row.w_name}&start_date=${filter.startDate}&end_date=${filter.endDate}&author_id=${row.w_author_id}`
    );
  };
  return (
    <tr key={row.w_author_id}>
      <td style={{ width: 60, textAlign: "left", padding: "12px 6px 6px 40px" }}>
        <Typography level="body-sm">{row.w_name}</Typography>
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-sm">{row.w_rows}</Typography>
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-sm">{row.w_total.toFixed(2)}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-sm">
          {row.w_start_date ? `${formatDateToString(row.w_start_date)} ${formatTimeToString(row.w_start_date)}` : "-"}
        </Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-sm">
          {row.w_end_date ? `${formatDateToString(row.w_end_date)} ${formatTimeToString(row.w_end_date)}` : "-"}
        </Typography>
      </td>
      <td style={{ width: 20, textAlign: "center", padding: "12px 6px" }}>
        <TableIconButton color="success" onClick={() => handleInfoButtonClick()}>
          <InfoOutlinedIcon />
        </TableIconButton>
      </td>
    </tr>
  );
}
