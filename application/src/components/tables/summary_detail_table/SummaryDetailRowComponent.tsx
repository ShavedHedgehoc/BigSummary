// import * as React from "react";
import { observer } from "mobx-react-lite";

import { Button, Typography, useColorScheme } from "@mui/joy";
// import { Context } from "../../../main";
import { IRecord } from "../../../types";
import { useNavigate } from "react-router-dom";

const SummaryDetailRowComponent = ({ row }: { row: IRecord }) => {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const navigate = useNavigate();
  //   const { store } = React.useContext(Context);

  const selClass = (item: IRecord) => {
    if (item.histories.length == 0) {
      return "list-group-item list-group-item-light";
    }
    const status = item.histories[item.histories.length - 1]?.historyType.value;
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
        <Typography level="body-xs">{row.product.code1C}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.product.marking}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.boil.value}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.plan}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.apparatus.value}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.can.value}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.conveyor.value}</Typography>
      </td>

      <td scope={selClass(row)} style={{ width: 200, textAlign: "justify", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.note}</Typography>
      </td>

      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          // sx={(theme) => ({
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
          {row.histories.length ? row.histories[row.histories.length - 1].historyType.description : "-"}
        </Typography>
      </td>

      <td scope={selClass(row)} style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
        <Button variant="outlined" color="primary" size="sm" onClick={() => navigate(`/record/` + `${row.id}`)}>
          <Typography level="body-xs" variant="plain" color="primary">
            Подробнее
          </Typography>
        </Button>
      </td>
    </tr>
  );
};

export default observer(SummaryDetailRowComponent);
