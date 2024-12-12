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
import { useForemanHistoryModalStore } from "./store/use-foreman-history-modal-store";
import { useCreateHistory } from "../../shared/api/use-create-history";
import { rowScope } from "../../shared/helpers/status-conditions";
import { StyledTypography } from "../../shared/ui/styled-typography";

// import { useAddRecordModalStore } from "./store/use-add-record-modal-store";

const HistoryModalOpenButton = ({ row }: { row: IDocRow }) => {
  const setOpen = useForemanHistoryModalStore(useShallow((state) => state.setOpen));
  const setRecordId = useForemanHistoryModalStore(useShallow((state) => state.setRecordId));
  const setTitle = useForemanHistoryModalStore(useShallow((state) => state.setTitle));
  const setCancelStartButtonEnabled = useForemanHistoryModalStore(
    useShallow((state) => state.setCancelStartButtonEnabled)
  );
  const setCancelFinishButtonEnabled = useForemanHistoryModalStore(
    useShallow((state) => state.setCancelFinishButtonEnabled)
  );
  const handleOpenHistoryModalButtonClick = () => {
    // setCancelStartButtonEnabled(row.stateValue === "product_in_progress");
    setCancelFinishButtonEnabled(row.stateValue === "product_finished");

    if (row.stateValue === "product_in_progress") {
      setCancelStartButtonEnabled(true);
    } else {
      setCancelStartButtonEnabled(false);
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

  const { mode } = useColorScheme();
  const scope = rowScope(row.stateValue);

  return (
    <tr key={row.id}>
      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.productId}</Typography>
      </td>
      <td scope={scope} style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.product}</Typography>
      </td>
      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.boil}</Typography>
      </td>

      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.conveyor}</Typography>
      </td>
      <td scope={scope} style={{ width: 110, textAlign: "center", padding: "18px 6px" }}>
        <StyledTypography text={row.state} state={row.stateValue} />
      </td>
      <td scope={scope} style={{ width: 30, textAlign: "center", padding: "6px 6px" }}>
        {row.historiesCount !== 0 && <HistoryModalOpenButton row={row} />}
      </td>

      <td scope={scope} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "product_pass" && (
          <Button
            startDecorator={<LoopOutlinedIcon />}
            variant="outlined"
            color={mode === "dark" ? "success" : "neutral"}
            size="sm"
            onClick={() => makeHistoryRecord(row.id, "product_in_progress")}
          >
            <Typography level="body-xs" variant="plain" color={mode === "dark" ? "success" : "neutral"}>
              Начать
            </Typography>
          </Button>
        )}
      </td>
      <td scope={scope} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "product_in_progress" && (
          <Button
            startDecorator={<LoopOutlinedIcon />}
            variant="outlined"
            color={mode === "dark" ? "success" : "neutral"}
            size="sm"
            onClick={() => makeHistoryRecord(row.id, "product_finished")}
          >
            <Typography level="body-xs" variant="plain" color={mode === "dark" ? "success" : "neutral"}>
              Закончить
            </Typography>
          </Button>
        )}
      </td>
    </tr>
  );
}
