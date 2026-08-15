import { Box, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { ITraceBatchRowData } from "../../shared/api/services/trace-batchs-service";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import TableButton from "../../shared/ui/table-button";
import { RouteNames } from "../../shared/router/route-names";

export default function TraceBatchsTableRow({ row }: { row: ITraceBatchRowData }) {
  const navigate = useNavigate();
  return (
    <tr key={row.batch_id}>
      <td style={{ width: 60, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.batch_name}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.marking}</Typography>
      </td>
      <td style={{ width: 60, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatDateToString(row.date)}</Typography>
      </td>
      <td style={{ width: 60, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.plant}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 24px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <TableButton
            variant="success"
            label="ПРОСМОТР"
            // disabled={row.records === 0}
            onClick={() => navigate(RouteNames.TRACE_BATCHS + row.batch_id)}
            startDecorator={<RemoveRedEyeOutlinedIcon />}
          />
        </Box>
      </td>
    </tr>
  );
}
