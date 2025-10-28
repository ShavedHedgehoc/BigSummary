import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useShallow } from "zustand/react/shallow";
import { useForemanHistoryModalStore } from "./store/use-foreman-history-modal-store";
import { useCreateHistory } from "../../shared/api/use-create-history";
import { TableState } from "../../shared/ui/table-state";
import TableButton from "../../shared/ui/table-button";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAuthStore } from "../auth/store/auth-store";

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
  const user = useAuthStore(useShallow((state) => state.user));
  const { addHistory, isPending } = useCreateHistory();
  const makeHistoryRecord = (id: number, state: string) => {
    if (user) {
      const data: AddHistoryDto = {
        record_id: id,
        boil_value: null,
        historyType: state,
        userId: user.id,
        employeeId: null,
        note: null,
        history_note: null,
      };
      addHistory(data);
    }
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
        <Typography level="body-xs">{row.conveyor}</Typography>
      </td>
      <td style={{ width: 110, textAlign: "center", padding: "18px 6px" }}>
        <TableState text={row.state} state={row.stateValue} />
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "6px 6px" }}>
        {row.historiesCount !== 0 && <HistoryModalOpenButton row={row} />}
      </td>

      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "product_pass" && (
          <TableButton
            variant="success"
            label="НАЧАТЬ"
            disabled={isPending}
            onClick={() => makeHistoryRecord(row.id, "product_in_progress")}
            startDecorator={<KeyboardDoubleArrowRightOutlinedIcon />}
          />
        )}
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        {row.stateValue === "product_in_progress" && (
          <TableButton
            variant="success"
            label="ЗАКОНЧИТЬ"
            disabled={isPending}
            onClick={() => makeHistoryRecord(row.id, "product_finished")}
            startDecorator={<CheckOutlinedIcon />}
          />
        )}
      </td>
    </tr>
  );
}
