import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import { IDoc } from "../../../types";
import { Box, Button, Typography, useColorScheme } from "@mui/joy";
import { formatDateToString } from "../../../utils";
import { useNavigate } from "react-router-dom";

const SummaryListRowComponent = ({ row, role }: { row: IDoc; role: string }) => {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const { store } = React.useContext(Context);
  const navigate = useNavigate();

  const selClass = (item: IDoc) => {
    if (item.historiesCount === 0) {
      return "list-group-item list-group-item-light";
    }
    return "success";
  };

  const StyledTypography = ({ row, text }: { row: IDoc; text: string | number }) => {
    return (
      <Typography
        level="body-xs"
        sx={() => ({
          color: mode === "dark" ? (selClass(row) === "success" ? "success.plainColor" : "neutral") : "neutral",
        })}
      >
        {text}
      </Typography>
    );
  };

  return (
    <tr key={row.id}>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{formatDateToString(row.date)}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.plant}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.recordsCount}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography row={row} text={row.historiesCount} />
      </td>

      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          {role === "planner" && (
            <Button
              variant="outlined"
              color="danger"
              size="sm"
              onClick={() => store.DocStore.deleteDoc(row.id)}
              disabled={row.historiesCount !== 0}
            >
              <Typography level="body-xs" variant="plain" color={row.historiesCount === 0 ? "danger" : "neutral"}>
                Удалить
              </Typography>
            </Button>
          )}

          <Button variant="outlined" color="success" size="sm" onClick={() => navigate(`/summary/` + `${row.id}`)}>
            <Typography level="body-xs" variant="plain" color="success">
              Просмотр
            </Typography>
          </Button>
        </Box>
      </td>
    </tr>
  );
};
export default observer(SummaryListRowComponent);
