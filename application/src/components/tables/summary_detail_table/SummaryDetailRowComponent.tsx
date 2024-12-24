// import * as React from "react";
import { observer } from "mobx-react-lite";

import { Button, Typography, useColorScheme } from "@mui/joy";
// import { Context } from "../../../main";
import { IDocRow } from "../../../types";
import { useNavigate } from "react-router-dom";
import { statusCondition } from "../../../utils";

const SummaryDetailRowComponent = ({ row }: { row: IDocRow }) => {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const navigate = useNavigate();
  //   const { store } = React.useContext(Context);

  const selClass = (item: IDocRow) => {
    if (item.historiesCount == 0) {
      return "list-group-item list-group-item-light";
    }
    return statusCondition(item.stateValue);
  };

  const StyledTypography = ({ row, text }: { row: IDocRow; text: string | number }) => {
    return (
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
        {text}
      </Typography>
    );
  };

  return (
    <tr key={row.id}>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.productId}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.product}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.boil}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.plan}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.apparatus}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.can}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.conveyor}</Typography>
      </td>

      <td scope={selClass(row)} style={{ width: 200, textAlign: "justify", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.note}</Typography>
      </td>

      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.state} row={row} />
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
