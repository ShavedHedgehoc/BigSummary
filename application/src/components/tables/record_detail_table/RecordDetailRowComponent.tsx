import { observer } from "mobx-react-lite";
import { Typography, useColorScheme } from "@mui/joy";
import { IHistory } from "../../../types";
import { formatDateToString, formatTimeToString } from "../../../utils";

const RowDetailRowComponent = ({ row }: { row: IHistory }) => {
  const { mode, systemMode } = useColorScheme();
  systemMode;

  const selClass = (item: IHistory) => {
    const status = item.historyType.value;
    switch (status) {
      case "base_fail":
        return "fail";
      case "product_fail":
        return "fail";
      case "base_check":
        return "wait";
      case "product_check":
        return "wait";
      case "plug_pass":
        return "success";
      case "product_pass":
        return "success";
      case "cancelled":
        return "cancelled";
      default:
        return "und";
    }
  };

  return (
    <tr key={row.id}>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          sx={() => ({
            color:
              mode === "dark"
                ? selClass(row) === "fail"
                  ? "danger.plainColor"
                  : selClass(row) === "success"
                  ? "success.plainColor"
                  : selClass(row) === "wait"
                  ? "warning.plainColor"
                  : "neutral"
                : "neutral",
          })}
        >
          {formatDateToString(row.createdAt)}
        </Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          sx={() => ({
            color:
              mode === "dark"
                ? selClass(row) === "fail"
                  ? "danger.plainColor"
                  : selClass(row) === "success"
                  ? "success.plainColor"
                  : selClass(row) === "wait"
                  ? "warning.plainColor"
                  : "neutral"
                : "neutral",
          })}
        >
          {formatTimeToString(row.createdAt)}
        </Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          sx={() => ({
            color:
              mode === "dark"
                ? selClass(row) === "fail"
                  ? "danger.plainColor"
                  : selClass(row) === "success"
                  ? "success.plainColor"
                  : selClass(row) === "wait"
                  ? "warning.plainColor"
                  : "neutral"
                : "neutral",
          })}
        >
          {row.historyType.description}
        </Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          sx={() => ({
            color:
              mode === "dark"
                ? selClass(row) === "fail"
                  ? "danger.plainColor"
                  : selClass(row) === "success"
                  ? "success.plainColor"
                  : selClass(row) === "wait"
                  ? "warning.plainColor"
                  : "neutral"
                : "neutral",
          })}
        >
          {row.user ? row.user.name : row.employee ? row.employee.name : "-"}
        </Typography>
      </td>

      {/* <td scope={selClass(row)} style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
        <Button variant="outlined" color="primary" size="sm" onClick={() => navigate(`/record/` + `${row.id}`)}>
          <Typography level="body-xs" variant="plain" color="primary">
            Подробнее
          </Typography>
        </Button>
      </td> */}
    </tr>
  );
};

export default observer(RowDetailRowComponent);
