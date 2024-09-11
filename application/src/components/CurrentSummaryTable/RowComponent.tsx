import * as React from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { IRecord } from "../../types";
import { HistoryCreateDto } from "../../services/HistoryService";
import { Box, Button, Typography, useColorScheme } from "@mui/joy";

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
          <Typography
            level="body-xs"
            sx={(theme) => ({
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
      )}
      {role === "technologist" && (
        <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
          {row.histories.length <= 0 && (
            <Button
              variant="outlined"
              color="success"
              size="sm"
              // onClick={() => makeHistoryRecord(row.boil.value, row.product.code1C, "plug_pass", row.id)}
              onClick={() => makeHistoryRecord(row.boil.value, row.product.code1C, "plug_pass", row.id)}
            >
              <Typography level="body-xs" variant="plain" color="success">
                Подключение
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
