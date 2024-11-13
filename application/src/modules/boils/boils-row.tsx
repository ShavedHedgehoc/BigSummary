import * as React from "react";
import { Button, Typography, useColorScheme } from "@mui/joy";

import IconButton from "@mui/joy/IconButton";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { rowScope } from "../../shared/helpers/status-conditions";
import { StyledTypography } from "../../shared/ui/styled-typography";

import { useShallow } from "zustand/shallow";
import { useBoilHistoryModalStore } from "./store/use-boil-history-modal-store";
import { Context } from "../../main";
import { useAddBoilModalStore } from "./store/use-add-boil-modal-store";
import { useCreateHistory } from "../../shared/api/use-create-history";

const HistoryModalOpenButton = ({ row }: { row: IBoilRow }) => {
  const setOpen = useBoilHistoryModalStore(useShallow((state) => state.setOpen));
  const setBoilId = useBoilHistoryModalStore(useShallow((state) => state.setBoilId));
  const setBoilValue = useBoilHistoryModalStore(useShallow((state) => state.setBoilValue));
  const setTitle = useBoilHistoryModalStore(useShallow((state) => state.setTitle));
  const setCancelButtonEnabled = useBoilHistoryModalStore(useShallow((state) => state.setCancelButtonEnabled));
  const handleOpenHistoryModalButtonClick = () => {
    if (
      row.stateValue === "base_fail" ||
      row.stateValue === "base_correct" ||
      row.stateValue === "plug_pass" ||
      row.stateValue === "base_continue"
    ) {
      setCancelButtonEnabled(true);
    } else {
      setCancelButtonEnabled(false);
    }
    setBoilId(row.id);
    setBoilValue(row.value);
    setTitle(`Историй статусов по партии ${row.value}`);
    setOpen(true);
  };
  return (
    <IconButton variant="plain" size="sm" onClick={() => handleOpenHistoryModalButtonClick()}>
      <InfoOutlinedIcon />
    </IconButton>
  );
};

export default function RowComponent({ row }: { row: IBoilRow }) {
  const { store } = React.useContext(Context);
  const setOpen = useAddBoilModalStore(useShallow((state) => state.setOpen));
  const setTitle = useAddBoilModalStore(useShallow((state) => state.setTitle));
  // const setId = useAddBoilModalStore(useShallow((state) => state.setId));
  const setBoilValue = useAddBoilModalStore(useShallow((state) => state.setBoilValue));
  const setState = useAddBoilModalStore(useShallow((state) => state.setState));
  const setNoteRequired = useAddBoilModalStore(useShallow((state) => state.setNoteRequired));

  const addHistory = useCreateHistory();

  const handleContinueButtonClick = () => {
    const data: AddHistoryDto = {
      record_id: null,
      boil_value: row.value,
      historyType: "base_continue",
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
      history_note: null,
    };
    addHistory(data);
  };

  const handleCorrectButtonClick = () => {
    setBoilValue(row.value);
    setTitle(`Партия - ${row.value}, статус - "Требуется корректировка"`);
    setState("base_correct");
    setNoteRequired(true);
    setOpen(true);
  };
  const handlePassButtonClick = () => {
    setBoilValue(row.value);
    setTitle(`Партия - ${row.value}, статус - "Допуск на подключение"`);
    setState("plug_pass");
    setNoteRequired(false);
    setOpen(true);
  };

  const handleFailButtonClick = () => {
    setBoilValue(row.value);
    setTitle(`Партия - ${row.value}, статус - "Брак основы"`);
    setState("base_fail");
    setNoteRequired(true);
    setOpen(true);
  };

  const { mode } = useColorScheme();
  const scope = rowScope(row.stateValue);

  return (
    <tr key={row.id}>
      <td scope={scope} style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.value}</Typography>
      </td>
      <td scope={scope} style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.base_marking ? row.base_marking : "-"}</Typography>
      </td>
      <td scope={scope} style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.base_code ? row.base_code : "-"}</Typography>
      </td>
      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.plant ? row.plant : "-"}</Typography>
      </td>
      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.recordsCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.recordsCount}
        </Typography>
      </td>
      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.historiesCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.historiesCount}
        </Typography>
      </td>

      <td scope={scope} style={{ width: 96, textAlign: "center", padding: "18px 6px" }}>
        <StyledTypography text={row.state} state={row.stateValue} />
      </td>

      <td scope={scope} style={{ width: 30, textAlign: "center", padding: "6px 6px" }}>
        {row.historiesCount !== 0 && <HistoryModalOpenButton row={row} />}
      </td>

      <td scope={scope} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "base_check" && (
          <Button
            startDecorator={<KeyboardDoubleArrowRightOutlinedIcon />}
            variant="outlined"
            color={mode === "dark" ? "success" : "neutral"}
            size="sm"
            onClick={() => handleContinueButtonClick()}
          >
            <Typography level="body-xs" variant="plain" color={mode === "dark" ? "success" : "neutral"}>
              Продолжение
            </Typography>
          </Button>
        )}
      </td>
      <td scope={scope} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "base_check" && (
          <Button
            startDecorator={<LoopOutlinedIcon />}
            variant="outlined"
            color={mode === "dark" ? "warning" : "neutral"}
            size="sm"
            onClick={() => handleCorrectButtonClick()}
          >
            <Typography level="body-xs" variant="plain" color={mode === "dark" ? "warning" : "neutral"}>
              Корректировка
            </Typography>
          </Button>
        )}
      </td>

      <td scope={scope} style={{ width: 70, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "base_check" && (
          <Button
            startDecorator={<CheckOutlinedIcon />}
            variant="outlined"
            color={mode === "dark" ? "success" : "neutral"}
            size="sm"
            onClick={() => handlePassButtonClick()}
          >
            <Typography level="body-xs" variant="plain" color={mode === "dark" ? "success" : "neutral"}>
              Допуск
            </Typography>
          </Button>
        )}
      </td>
      <td scope={scope} style={{ width: 60, textAlign: "center", padding: "6px 6px" }}>
        {row.stateValue !== "base_fail" && row.historiesCount !== 0 && (
          <IconButton color="danger" size="sm" onClick={() => handleFailButtonClick()}>
            <BlockOutlinedIcon />
          </IconButton>
        )}
      </td>
    </tr>
  );
}
