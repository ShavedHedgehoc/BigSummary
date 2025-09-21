import { Typography } from "@mui/joy";
import { ITrademarkRowData } from "../../shared/api/services/trace-trademark-service";

export default function TrademarksTableRow({ row }: { row: ITrademarkRowData }) {
  return (
    <tr key={row.trademark_name}>
      <td style={{ width: 80, textAlign: "left", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.trademark_name}</Typography>
      </td>
      <td style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.product_id}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "left", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.product_name}</Typography>
      </td>
    </tr>
  );
}
