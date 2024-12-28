import * as React from "react";
import { observer } from "mobx-react-lite";
import { Button, Typography, useColorScheme } from "@mui/joy";
import { IHistory } from "../../../types";
import { formatDateToString, formatTimeToString, statusCondition } from "../../../utils";
import { Context } from "../../../main";
import { DbRoles } from "../../../dbRoles";

const RowDetailRowComponent = ({ row }: { row: IHistory }) => {
  const { store } = React.useContext(Context);
  const { mode, systemMode } = useColorScheme();
  systemMode;

  const selClass = (item: IHistory) => {
    const status = item.historyType.value;
    return statusCondition(status);
  };

  const deleteHistory = (id: number) => {
    store.HistoryStore.deleteHistory(id).then(
      () =>
        store.RecordDetailStore.record &&
        store.RecordDetailStore.fetchHistoriesByRecId(store.RecordDetailStore.record.id.toString())
    );
  };

  return (
    <tr key={row.id}>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{formatDateToString(row.createdAt)}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{formatTimeToString(row.createdAt)}</Typography>
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
        <Typography level="body-xs">{row.user ? row.user.name : row.employee ? row.employee.name : "-"}</Typography>
      </td>
      {store.AuthStore.user && store.AuthStore.user.roles.includes(DbRoles.GODMODE) && (
        <td scope={selClass(row)} style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
          <Button variant="outlined" color="danger" size="sm" onClick={() => deleteHistory(row.id)}>
            <Typography level="body-xs" variant="plain" color="danger">
              Удалить
            </Typography>
          </Button>
        </td>
      )}
    </tr>
  );
};

export default observer(RowDetailRowComponent);
