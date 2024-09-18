import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { IRecord } from "../../types";
import { HistoryCreateDto } from "../../services/HistoryService";
import { Box, Button, Typography, useColorScheme } from "@mui/joy";
import { statusCondition } from "../../utils";

const RowComponent = ({ row, role }: { row: IRecord; role: string }) => {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const { store } = React.useContext(Context);

  const makeHistoryRecord = (boil: string, code: string | null, historyType: string, id: number) => {
    const data: HistoryCreateDto = {
      boil: boil,
      historyType: historyType,
      code: code,
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
    };
    store.HistoryStore.createHistory(data).then(() => store.SummaryStore.updateRecord(id));
  };

  const deleteHistoryRecord = (historyId: number, id: number) => {
    store.HistoryStore.deleteHistory(historyId).then(() => store.SummaryStore.updateRecord(id));
  };

  const selClass = (item: IRecord) => {
    if (item.histories.length == 0) {
      return "list-group-item list-group-item-light";
    }
    const status = item.histories[item.histories.length - 1]?.historyType.value;
    return statusCondition(status);
  };

  const StyledTypography = ({ row, text }: { row: IRecord; text: string | number }) => {
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
        <StyledTypography text={row.product.code1C} row={row} />
      </td>
      <td scope={selClass(row)} style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.product.marking} row={row} />
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.boil.value} row={row} />
      </td>
      <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.plan} row={row} />
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.apparatus.value} row={row} />
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.can.value} row={row} />
      </td>
      <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.conveyor.value} row={row} />
      </td>
      {role === "user" && (
        <td scope={selClass(row)} style={{ width: 200, textAlign: "justify", padding: "12px 6px" }}>
          <StyledTypography text={row.note} row={row} />
        </td>
      )}
      {store.SummaryStore.recordPending && store.SummaryStore.updateRecordId == row.id ? (
        <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">Обновление...</Typography>
        </td>
      ) : (
        <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
          <StyledTypography
            text={row.histories.length ? row.histories[row.histories.length - 1].historyType.description : "-"}
            row={row}
          />
        </td>
      )}
      {role === "technologist" && (
        <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
          {row.histories.length <= 0 && (
            <Button
              variant="outlined"
              color="success"
              size="sm"
              onClick={() => makeHistoryRecord(row.boil.value, row.product.code1C, "plug_pass", row.id)}
            >
              <Typography level="body-xs" variant="plain" color="success">
                Подключение
              </Typography>
            </Button>
          )}
          {row.histories.length == 1 && row.histories[0].historyType.value === "plug_pass" && (
            <Button
              variant="outlined"
              color="success"
              size="sm"
              onClick={() => deleteHistoryRecord(row.histories[0].id, row.id)}
            >
              <Typography level="body-xs" variant="plain" color="success">
                Я ошибся!
              </Typography>
            </Button>
          )}
        </td>
      )}
      {role === "laboratory" && (
        <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
          {row.histories.length > 0 && row.histories[row.histories.length - 1].historyType.value === "base_check" && (
            <Button
              variant="outlined"
              color="success"
              size="sm"
              onClick={() => makeHistoryRecord(row.boil.value, row.product.code1C, "plug_pass", row.id)}
            >
              <Typography level="body-xs" variant="plain" color="success">
                Подключение
              </Typography>
            </Button>
          )}

          {row.histories.length > 0 &&
            row.histories[row.histories.length - 1].historyType.value === "product_check" && (
              <Button
                variant="outlined"
                color="success"
                size="sm"
                onClick={() => makeHistoryRecord(row.boil.value, row.product.code1C, "product_pass", row.id)}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              color="danger"
              size="sm"
              onClick={() => makeHistoryRecord(row.boil.value, null, "base_fail", row.id)}
            >
              <Typography level="body-xs" variant="plain" color="danger">
                Основа
              </Typography>
            </Button>

            <Button
              variant="outlined"
              color="danger"
              size="sm"
              onClick={() => makeHistoryRecord(row.boil.value, null, "product_fail", row.id)}
            >
              <Typography level="body-xs" variant="plain" color="danger">
                Продукт
              </Typography>
            </Button>
          </Box>
        </td>
      )}
    </tr>
  );
};

export default observer(RowComponent);
