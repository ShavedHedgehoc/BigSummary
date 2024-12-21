import * as React from "react";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useColorScheme } from "@mui/joy";

import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Context } from "../../main";
import { useShallow } from "zustand/shallow";
import { useRecordHistoryModalStore } from "./store/use-record-history-modal-store";
import { useCreateHistory } from "../../shared/api/use-create-history";
import { rowScope } from "../../shared/helpers/status-conditions";
import { StyledTypography } from "../../shared/ui/styled-typography";
import { useAddRecordModalStore } from "./store/use-add-record-modal-store";
import TableButton from "../../shared/ui/table-button";
import { TableIconButton } from "../../shared/ui/table-icon-button";
import { TableState } from "../../shared/ui/table-state";

const HistoryModalOpenButton = ({ row }: { row: IDocRow }) => {
  const setOpen = useRecordHistoryModalStore(useShallow((state) => state.setOpen));
  const setRecordId = useRecordHistoryModalStore(useShallow((state) => state.setRecordId));
  const setTitle = useRecordHistoryModalStore(useShallow((state) => state.setTitle));
  const setCancelButtonEnabled = useRecordHistoryModalStore(useShallow((state) => state.setCancelButtonEnabled));
  const handleOpenHistoryModalButtonClick = () => {
    if (
      row.stateValue === "product_fail" ||
      row.stateValue === "product_correct" ||
      row.stateValue === "product_pass"
    ) {
      setCancelButtonEnabled(true);
    } else {
      setCancelButtonEnabled(false);
    }
    setRecordId(row.id);
    setTitle(`Историй статусов по продукту ${row.product}, партия - ${row.boil}`);
    setOpen(true);
  };
  return (
    <IconButton variant="plain" size="sm" onClick={() => handleOpenHistoryModalButtonClick()}>
      <InfoOutlinedIcon />
    </IconButton>
  );
};

export default function RowComponent({ row }: { row: IDocRow }) {
  const { store } = React.useContext(Context);
  const setOpen = useAddRecordModalStore(useShallow((state) => state.setOpen));
  const setTitle = useAddRecordModalStore(useShallow((state) => state.setTitle));
  const setRecordId = useAddRecordModalStore(useShallow((state) => state.setRecordId));
  const setState = useAddRecordModalStore(useShallow((state) => state.setState));
  const setNoteRequired = useAddRecordModalStore(useShallow((state) => state.setNoteRequired));

  const addHistory = useCreateHistory();

  const makeHistoryRecord = (id: number, state: string) => {
    const data: AddHistoryDto = {
      record_id: id,
      boil_value: null,
      historyType: state,
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
      history_note: null,
    };
    addHistory(data);
  };

  const handleCorrectButtonClick = () => {
    setRecordId(row.id);
    setTitle(`Продукт ${row.product}, партия - ${row.boil}, статус - "Требуется доработка"`);
    setState("product_correct");
    setNoteRequired(true);
    setOpen(true);
  };

  const handleFailButtonClick = () => {
    setRecordId(row.id);
    setTitle(`Продукт ${row.product}, партия - ${row.boil}, статус - "Брак продукта"`);
    setState("product_fail");
    setNoteRequired(true);
    setOpen(true);
  };

  return (
    <tr key={row.id}>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.productId}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.product}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.boil}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.apparatus}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.can}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.conveyor}</Typography>
      </td>
      <td style={{ width: 110, textAlign: "center", padding: "18px 6px" }}>
        {/* <StyledTypography text={row.state} state={row.stateValue} /> */}
        <TableState text={row.state} state={row.stateValue} />
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "6px 6px" }}>
        {row.historiesCount !== 0 && <HistoryModalOpenButton row={row} />}
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "product_check" && (
          <TableButton
            variant="warning"
            label="ДОРАБОТКА"
            onClick={() => handleCorrectButtonClick()}
            startDecorator={<LoopOutlinedIcon />}
          />

          // <Button
          //   startDecorator={<LoopOutlinedIcon />}
          //   variant="outlined"
          //   color={mode === "dark" ? "warning" : "neutral"}
          //   size="sm"
          //   onClick={() => handleCorrectButtonClick()}
          // >
          //   <Typography level="body-xs" variant="plain" color={mode === "dark" ? "warning" : "neutral"}>
          //     Доработка
          //   </Typography>
          // </Button>
        )}
      </td>

      <td style={{ width: 70, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "product_check" && (
          <TableButton
            variant="success"
            label="ДОПУСК"
            onClick={() => makeHistoryRecord(row.id, "product_pass")}
            startDecorator={<CheckOutlinedIcon />}
          />
          // <Button
          //   startDecorator={<CheckOutlinedIcon />}
          //   variant="outlined"
          //   color={mode === "dark" ? "success" : "neutral"}
          //   size="sm"
          //   onClick={() => makeHistoryRecord(row.id, "product_pass")}
          // >
          //   <Typography level="body-xs" variant="plain" color={mode === "dark" ? "success" : "neutral"}>
          //     Допуск
          //   </Typography>
          // </Button>
        )}
      </td>
      <td style={{ width: 60, textAlign: "center", padding: "6px 6px" }}>
        {row.stateValue !== "product_fail" &&
          row.stateValue !== "base_check" &&
          row.stateValue !== "base_fail" &&
          row.stateValue !== "plug_pass" &&
          row.stateValue !== "base_continue" &&
          row.stateValue !== "product_finished" &&
          row.historiesCount !== 0 && (
            <TableIconButton color="danger" onClick={() => handleFailButtonClick()}>
              <BlockOutlinedIcon />
            </TableIconButton>
            // <IconButton color="danger" size="sm" onClick={() => handleFailButtonClick()}>
            //   <BlockOutlinedIcon />
            // </IconButton>
          )}
      </td>
    </tr>
  );
}
