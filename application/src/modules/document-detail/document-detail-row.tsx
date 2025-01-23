import Typography from "@mui/joy/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import { TableState } from "../../shared/ui/table-state";
import { TableIconButton } from "../../shared/ui/table-icon-button";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/joy";
import { useDeleteRecord } from "./use-delete-record";

export default function DocumentDetailRow({ row }: { row: IDocRow }) {
  const navigate = useNavigate();
  const { deleteRecord, deletePending } = useDeleteRecord();
  return (
    <tr key={row.id}>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.productId}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.product}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.boil}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.plan}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.apparatus}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.can}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.conveyor}</Typography>
      </td>
      <td style={{ width: 200, textAlign: "justify", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.note}</Typography>
      </td>
      <td style={{ width: 110, textAlign: "center", padding: "18px 6px" }}>
        <TableState text={row.state} state={row.stateValue} />
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <TableIconButton color="success" disabled={deletePending} onClick={() => navigate(`/record/` + `${row.id}`)}>
            <InfoOutlinedIcon />
          </TableIconButton>
          <TableIconButton
            color="danger"
            disabled={deletePending || row.state !== "-"}
            onClick={() => deleteRecord(row.id)}
          >
            <DeleteOutlinedIcon />
          </TableIconButton>
        </Box>
      </td>
    </tr>
  );
}
