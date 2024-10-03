import * as React from "react";
import { observer } from "mobx-react-lite";
import { Box, Button, Typography, useColorScheme } from "@mui/joy";
import { Context } from "../../../main";
import { IBoilsListItem } from "../../../types";
import { statusCondition } from "../../../utils";
import { AddHistoryDto } from "../../../services/HistoryService";

const BoilListRowComponent = ({
  row,
  role,
  makeRecord,
}: {
  row: IBoilsListItem;
  role: string;
  makeRecord({ boil, state }: { boil: IBoilsListItem; state: string }): void;
}) => {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const { store } = React.useContext(Context);

  const makeHistoryRecord = (boil: string | null, historyType: string, id: number | null) => {
    const data: AddHistoryDto = {
      record_id: id,
      boil_value: boil !== "-" ? boil : null,
      historyType: historyType,
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
    };
    store.HistoryStore.createHistory(data).then(() => store.BoilStore.updateBoil(row.id));
  };
  const selClass = (item: IBoilsListItem) => {
    if (!item.stateValue) {
      return "list-group-item list-group-item-light";
    }
    return statusCondition(item.stateValue);
  };

  const StyledTypography = ({ row, text }: { row: IBoilsListItem; text: string | number }) => {
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
        <Typography level="body-xs">{row.base_code ? row.base_code : "-"}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.base_marking ? row.base_marking : "-"}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.value}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.recordsCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.recordsCount}
        </Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.historiesCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.historiesCount}
        </Typography>
      </td>
      {store.BoilStore.boilPending && store.BoilStore.updateBoilId == row.id ? (
        <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">Обновление...</Typography>
        </td>
      ) : (
        <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
          <StyledTypography text={row.state} row={row} />
        </td>
      )}
      {role === "laboratory" && (
        <>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.stateValue !== "base_fail" && (
              <Button
                variant="outlined"
                color="danger"
                size="sm"
                // onClick={() => makeHistoryRecord(row.value, "base_fail", null)}
                onClick={() => makeRecord({ boil: row, state: "base_fail" })}
              >
                <Typography level="body-xs" variant="plain" color="danger">
                  Забраковать
                </Typography>
              </Button>
            )}
          </td>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.stateValue === "base_check" && (
              <Button
                variant="outlined"
                color="warning"
                size="sm"
                onClick={() => makeHistoryRecord(row.value, "base_correct", null)}
              >
                <Typography level="body-xs" variant="plain" color="warning">
                  Корректировка
                </Typography>
              </Button>
            )}
          </td>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.stateValue === "base_check" && (
              <Button
                variant="outlined"
                color="success"
                size="sm"
                onClick={() => makeHistoryRecord(row.value, "base_continue", null)}
              >
                <Typography level="body-xs" variant="plain" color="success">
                  Продолжение варки
                </Typography>
              </Button>
            )}
          </td>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.stateValue === "base_check" && (
              <Button
                variant="outlined"
                color="success"
                size="sm"
                onClick={() => makeHistoryRecord(row.value, "plug_pass", null)}
              >
                <Typography level="body-xs" variant="plain" color="success">
                  Подключение
                </Typography>
              </Button>
            )}
          </td>
        </>
      )}
      {role === "reports" && (
        <>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.recordsCount > 0 && (
              <Button
                variant="outlined"
                color="primary"
                size="sm"
                // onClick={() => makeHistoryRecord(row.value, "base_fail", null)}
              >
                <Typography level="body-xs" variant="plain" color="primary">
                  Сводки
                </Typography>
              </Button>
            )}
          </td>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.historiesCount > 0 && (
              <Button
                variant="outlined"
                color="primary"
                size="sm"
                // onClick={() => makeHistoryRecord(row.value, "plug_pass", null)}
              >
                <Typography level="body-xs" variant="plain" color="primary">
                  Подробнее
                </Typography>
              </Button>
            )}
          </td>
        </>
      )}
    </tr>
  );
};

export default observer(BoilListRowComponent);
