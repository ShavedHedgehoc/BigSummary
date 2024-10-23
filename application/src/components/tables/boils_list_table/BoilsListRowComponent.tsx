import * as React from "react";
import { observer } from "mobx-react-lite";
import { Button, Typography, useColorScheme } from "@mui/joy";
import { Context } from "../../../main";

import { statusCondition } from "../../../utils";
import { AddHistoryDto } from "../../../services/HistoryService";
import IconButton from "@mui/joy/IconButton";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IBoilRow } from "../../../store/BoilStore";

const BoilListRowComponent = ({
  row,
  role,
  makeRecord,
  showStatesList,
}: {
  row: IBoilRow;
  role: string;
  makeRecord({ boil, state }: { boil: IBoilRow; state: string }): void;
  showStatesList(boil: IBoilRow): void;
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
      history_note: null,
    };
    store.HistoryStore.createHistory(data).then(() => store.BoilStore.updateBoil(row.id));
  };

  const selClass = (item: IBoilRow) => {
    if (!item.stateValue) {
      return "list-group-item list-group-item-light";
    }
    return statusCondition(item.stateValue);
  };

  const StyledTypography = ({ row, text }: { row: IBoilRow; text: string | number }) => {
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
        <Typography level="body-xs">{row.value}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.base_marking ? row.base_marking : "-"}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.base_code ? row.base_code : "-"}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.plant ? row.plant : "-"}</Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.recordsCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.recordsCount}
        </Typography>
      </td>
      <td scope={selClass(row)} style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.historiesCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.historiesCount}
        </Typography>
      </td>
      {store.BoilStore.state.rowPending && store.BoilStore.state.updateRowId == row.id ? (
        <td scope={selClass(row)} style={{ width: 110, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">Обновление...</Typography>
        </td>
      ) : (
        <td scope={selClass(row)} style={{ width: 110, textAlign: "center", padding: "12px 6px" }}>
          <StyledTypography text={row.state} row={row} />
        </td>
      )}
      {role === "laboratory" && (
        <td scope={selClass(row)} style={{ width: 30, textAlign: "center", padding: "6px 6px" }}>
          {row.historiesCount !== 0 && (
            <IconButton
              variant="plain"
              // color={mode === "dark" ? "warning" : "neutral"}
              size="sm"
              onClick={() => showStatesList(row)}
            >
              <InfoOutlinedIcon />
            </IconButton>
          )}
        </td>
      )}
      {role === "laboratory" && (
        <>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.stateValue === "base_check" && (
              <Button
                startDecorator={<KeyboardDoubleArrowRightOutlinedIcon />}
                // endDecorator={<DoubleArrowOutlinedIcon />}
                variant="outlined"
                color={mode === "dark" ? "success" : "neutral"}
                size="sm"
                onClick={() => makeHistoryRecord(row.value, "base_continue", null)}
                // sx={{ fontWeight: "normal" }}
              >
                <Typography level="body-xs" variant="plain" color={mode === "dark" ? "success" : "neutral"}>
                  Продолжение
                </Typography>
              </Button>
            )}
          </td>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.stateValue === "base_check" && (
              <Button
                startDecorator={<LoopOutlinedIcon />}
                variant="outlined"
                color={mode === "dark" ? "warning" : "neutral"}
                size="sm"
                // onClick={() => makeHistoryRecord(row.value, "base_correct", null)}
                onClick={() => makeRecord({ boil: row, state: "base_correct" })}
              >
                <Typography level="body-xs" variant="plain" color={mode === "dark" ? "warning" : "neutral"}>
                  Корректировка
                </Typography>
              </Button>
            )}
          </td>

          <td scope={selClass(row)} style={{ width: 70, textAlign: "center", padding: "12px 6px" }}>
            {row.stateValue === "base_check" && (
              <Button
                startDecorator={<CheckOutlinedIcon />}
                variant="outlined"
                color={mode === "dark" ? "success" : "neutral"}
                size="sm"
                onClick={() => makeHistoryRecord(row.value, "plug_pass", null)}
              >
                <Typography level="body-xs" variant="plain" color={mode === "dark" ? "success" : "neutral"}>
                  Допуск
                </Typography>
              </Button>
            )}
          </td>
          <td scope={selClass(row)} style={{ width: 60, textAlign: "center", padding: "6px 6px" }}>
            {row.stateValue !== "base_fail" && row.historiesCount !== 0 && (
              <IconButton color="danger" size="sm" onClick={() => makeRecord({ boil: row, state: "base_fail" })}>
                <BlockOutlinedIcon />
              </IconButton>
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
                color="neutral"
                size="sm"
                // onClick={() => makeHistoryRecord(row.value, "base_fail", null)}
              >
                <Typography level="body-xs" variant="plain" color="neutral">
                  Сводки
                </Typography>
              </Button>
            )}
          </td>
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.historiesCount > 0 && (
              <Button
                variant="outlined"
                color="neutral"
                size="sm"
                // onClick={() => makeHistoryRecord(row.value, "plug_pass", null)}
              >
                <Typography level="body-xs" variant="plain" color="neutral">
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
