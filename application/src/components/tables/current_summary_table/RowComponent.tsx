import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import { IDocRow } from "../../../types";
import { AddHistoryDto } from "../../../services/HistoryService";
import { Box, Button, Typography, useColorScheme } from "@mui/joy";
import { statusCondition } from "../../../utils";

const RowComponent = ({ row, role }: { row: IDocRow; role: string }) => {
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
    store.HistoryStore.createHistory(data).then(() => {
      if (id) {
        return store.SummaryStore.updateRecord(id);
      }
    });
  };

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
      {role === "user" && (
        <td scope={selClass(row)} style={{ width: 200, textAlign: "justify", padding: "12px 6px" }}>
          <Typography level="body-xs">{row.note}</Typography>
        </td>
      )}
      {store.SummaryStore.recordPending && store.SummaryStore.updateRecordId == row.id ? (
        <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">Обновление...</Typography>
        </td>
      ) : (
        <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
          <StyledTypography text={row.state} row={row} />
        </td>
      )}

      {role === "laboratory" && (
        <td scope={selClass(row)} style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
          {row.historiesCount > 0 && row.stateValue === "product_check" && (
            <Button
              variant="outlined"
              color="success"
              size="sm"
              onClick={() => makeHistoryRecord(row.boil, "product_pass", row.id)}
            >
              <Typography level="body-xs" variant="plain" color="success">
                Фасовка
              </Typography>
            </Button>
          )}
        </td>
      )}
      {role === "laboratory" && (
        <td scope={selClass(row)} style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          > */}
          {/* {row.boil !== "-" && row.stateValue !== "product_finished" && (
              <Button
                variant="outlined"
                color="danger"
                size="sm"
                onClick={() => makeHistoryRecord(row.boil, "base_fail", null)}
              >
                <Typography level="body-xs" variant="plain" color="danger">
                  Основа
                </Typography>
              </Button>
            )} */}

          {row.stateValue !== "product_fail" && row.stateValue !== "product_finished" && (
            <Button
              variant="outlined"
              color="danger"
              size="sm"
              onClick={() => makeHistoryRecord(row.boil, "product_fail", row.id)}
            >
              <Typography level="body-xs" variant="plain" color="danger">
                Продукт
              </Typography>
            </Button>
          )}
          {/* </Box> */}
        </td>
      )}

      {role === "foreman" && (
        <td scope={selClass(row)} style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            {row.stateValue === "product_pass" && (
              <Button
                variant="outlined"
                color="success"
                size="sm"
                onClick={() => makeHistoryRecord(null, "product_in_progress", row.id)}
              >
                <Typography level="body-xs" variant="plain" color="success">
                  Начало фасовки
                </Typography>
              </Button>
            )}

            {row.stateValue === "product_in_progress" && (
              <Button
                variant="outlined"
                color="success"
                size="sm"
                onClick={() => makeHistoryRecord(null, "product_finished", row.id)}
              >
                <Typography level="body-xs" variant="plain" color="success">
                  Фасовка завершена
                </Typography>
              </Button>
            )}
          </Box>
        </td>
      )}
    </tr>
  );
};

export default observer(RowComponent);
