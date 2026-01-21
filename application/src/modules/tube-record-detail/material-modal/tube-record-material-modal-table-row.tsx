import { Typography } from "@mui/joy";
import { TubeRecordDetailConsumedMaterial } from "../../../shared/api/services/tube-records-service";

export default function TubeRecordMaterialModalTableRow({
  row,
  index,
}: {
  row: TubeRecordDetailConsumedMaterial;
  index: number;
}) {
  return (
    <tr key={row.code}>
      <td style={{ width: 10, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{index + 1}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.code}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "left", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.name}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "left", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.lot}</Typography>
      </td>
    </tr>
  );
}
