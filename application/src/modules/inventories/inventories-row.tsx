import { Typography, Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import TableButton from "../../shared/ui/table-button";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";

export default function InventoryDocsRow({ row }: { row: IInventoryDocRow }) {
  const navigate = useNavigate();

  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{formatDateToString(row.date)}</Typography>
      </td>
      <td style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.plant_name}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.records}</Typography>
      </td>

      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
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
            disabled={row.records === 0}
            onClick={() => navigate(`/inventories/` + `${row.id}`)}
            startDecorator={<RemoveRedEyeOutlinedIcon />}
          />
        </Box>
      </td>
    </tr>
  );
}
