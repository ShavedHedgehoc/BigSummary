import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { ITraceCan } from "../../shared/api/services/trace-cans-service";

export default function CansListRow({ row }: { row: ITraceCan }) {
  return (
    <tr key={row.CanPK}>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.CanName}</Typography>
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.CanVolume ? row.CanVolume : "-"}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.CanBarcode ? row.CanBarcode : "-"}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.plant_name ? row.plant_name : "-"}</Typography>
      </td>

      <td style={{ width: 110, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}></Box>
      </td>
    </tr>
  );
}
