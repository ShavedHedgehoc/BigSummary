import * as React from "react";
import { Typography, useColorScheme } from "@mui/joy";

import IconButton from "@mui/joy/IconButton";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useShallow } from "zustand/shallow";
import { useBoilHistoryModalStore } from "./store/use-boil-history-modal-store";
import { Context } from "../../main";
import { useAddBoilModalStore } from "./store/use-add-boil-modal-store";
import { useCreateHistory } from "../../shared/api/use-create-history";
import TableButton from "../../shared/ui/table-button";
import { TableIconButton } from "../../shared/ui/table-icon-button";
import { TableState } from "../../shared/ui/table-state";

const useHistoryModalOpen = ({ row }: { row: IBoilRow }) => {
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
  return handleOpenHistoryModalButtonClick;
};

const HistoryModalOpenButton = ({ row }: { row: IBoilRow }) => {
  const handleContinueButtonClick = useHistoryModalOpen({ row });
  return (
    <IconButton variant="plain" size="sm" onClick={() => handleContinueButtonClick()}>
      <InfoOutlinedIcon />
    </IconButton>
  );
};

export default function RowComponent({ row }: { row: IBoilRow }) {
  const { store } = React.useContext(Context);
  const setOpen = useAddBoilModalStore(useShallow((state) => state.setOpen));
  const setTitle = useAddBoilModalStore(useShallow((state) => state.setTitle));
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

  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.value}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.base_marking ? row.base_marking : "-"}</Typography>
      </td>

      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.base_code ? row.base_code : "-"}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.plant ? row.plant : "-"}</Typography>
      </td>

      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.recordsCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.recordsCount}
        </Typography>
      </td>

      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.historiesCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.historiesCount}
        </Typography>
      </td>

      <td style={{ width: 96, textAlign: "center", padding: "18px 6px" }}>
        <TableState text={row.state} state={row.stateValue} />
      </td>

      <td style={{ width: 30, textAlign: "center", padding: "6px 6px" }}>
        {row.historiesCount !== 0 && <HistoryModalOpenButton row={row} />}
      </td>

      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "base_check" && (
          <TableButton
            variant="success"
            label="ПРОДОЛЖЕНИЕ"
            onClick={() => handleContinueButtonClick()}
            startDecorator={<KeyboardDoubleArrowRightOutlinedIcon />}
          />
        )}
      </td>

      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "base_check" && (
          <TableButton
            variant="warning"
            label="КОРРЕКТИРОВКА"
            onClick={() => handleCorrectButtonClick()}
            startDecorator={<LoopOutlinedIcon />}
          />
        )}
      </td>

      <td style={{ width: 70, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "base_check" && (
          <TableButton
            variant="success"
            label="ДОПУСК"
            onClick={() => handlePassButtonClick()}
            startDecorator={<CheckOutlinedIcon />}
          />
        )}
      </td>

      <td style={{ width: 60, textAlign: "center", padding: "6px 6px" }}>
        {row.stateValue !== "base_fail" && row.historiesCount !== 0 && (
          <TableIconButton color="danger" onClick={() => handleFailButtonClick()}>
            <BlockOutlinedIcon />
          </TableIconButton>
        )}
      </td>
    </tr>
  );
}
