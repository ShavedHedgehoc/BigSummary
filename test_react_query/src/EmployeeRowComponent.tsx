import { Typography, useColorScheme } from "@mui/joy";
import { IEmployee } from "./services/EmployeeService";

export default function EmployeeRowComponent({ row }: { row: IEmployee }) {
  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.name}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.barcode}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.occupation.description}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        {/* <Typography level="body-xs">{row.value}</Typography> */}
      </td>
    </tr>
  );
}
