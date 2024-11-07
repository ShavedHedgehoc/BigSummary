import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";

import ModalLayout from "../../shared/layouts/modal-layout";
import TableLayout from "../../shared/layouts/table-layout";

import { useRecordHistories } from "./use-record-histories";
import { useRecordHistoryModalStore } from "./store/use-record-history-modal-store";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";
import { rowScope } from "../../shared/helpers/status-conditions";
import { StyledTypography } from "../../shared/ui/styled-typography";

import { Context } from "../../main";
import { useShallow } from "zustand/shallow";
import { useCreateHistoryDirect } from "../../shared/api/use-create-history-direct";
import { useNoteModalStore } from "../../shared/components/note-modal/use-note-modal-store";
import TableLoaderComponent from "../../components/tables/TableLoaderComponent";

export default function RecordsHistoryModal() {
  const { store } = React.useContext(Context);

  const open = useRecordHistoryModalStore(useShallow((state) => state.open));
  const cancelButtonEnabled = useRecordHistoryModalStore(useShallow((state) => state.cancelButtonEnabled));
  const record_id = useRecordHistoryModalStore(useShallow((state) => state.record_id));
  const title = useRecordHistoryModalStore(useShallow((state) => state.title));
  const setOpen = useRecordHistoryModalStore(useShallow((state) => state.setOpen));
  const { isPending, data, isSuccess } = useRecordHistories(record_id);
  const addHistoryDirect = useCreateHistoryDirect();

  const history_table_thead: TheadProperties[] = [
    { width: 50, padding: "18px 6px", value: "Дата" },
    { width: 50, padding: "18px 6px", value: "Время" },
    { width: 100, padding: "18px 6px", value: "Статус записи" },
    { width: 80, padding: "18px 6px", value: "Автор записи" },
    { width: 50, padding: "18px 6px", value: "Комментарий" },
  ];

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),
    title: title,
    height: 600,
    minHeight: 600,
    width: 800,
    onlyCloseButton: false,
  };

  const handleCancelButtonClick = () => {
    const data: AddHistoryDto = {
      record_id: record_id,
      boil_value: null, //add state to store
      historyType: "product_check", // condition between boil & record = > state
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
      history_note: "Отмена ошибочного внесения",
    };
    setOpen(false);
    addHistoryDirect(data);
  };

  const setNoteModalOpen = useNoteModalStore(useShallow((state) => state.setOpen));
  const setNoteId = useNoteModalStore(useShallow((state) => state.setNoteId));

  const handleNoteModalButtonClick = (note_id: number) => {
    setNoteId(note_id);
    setNoteModalOpen(true);
  };
  const RowComponent = ({ row }: { row: IHistory }) => {
    const scope = rowScope(row.historyType.value);
    return (
      <tr key={row.id}>
        <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
          <Typography level="body-xs">{formatDateToString(row.createdAt)}</Typography>
        </td>
        <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
          <Typography level="body-xs">{formatTimeToString(row.createdAt)}</Typography>
        </td>
        <td scope={scope} style={{ width: 100, textAlign: "center", padding: "18px 6px" }}>
          <StyledTypography text={row.historyType.description} state={row.historyType.value} />
        </td>
        <td scope={scope} style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
          <Typography level="body-xs">{row.user ? row.user.name : row.employee ? row.employee.name : "-"}</Typography>
        </td>
        <td scope={scope} style={{ width: 50, textAlign: "center", padding: "6px 6px" }}>
          {row.note_id && (
            <IconButton variant="plain" size="sm" onClick={() => handleNoteModalButtonClick(row.note_id)}>
              <InfoOutlinedIcon />
            </IconButton>
          )}
        </td>
      </tr>
    );
  };

  const ButtonsComponent = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1 }}>
        <Button
          color="neutral"
          variant="outlined"
          size={"sm"}
          sx={{ fontWeight: "normal", fontSize: "small" }}
          onClick={() => setOpen(false)}
        >
          Закрыть
        </Button>
        {cancelButtonEnabled && (
          <Button
            color="neutral"
            variant="outlined"
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            onClick={() => handleCancelButtonClick()}
          >
            Отменить последнюю запись
          </Button>
        )}
      </Box>
    );
  };

  const HistoryTable = () => {
    if (isPending) {
      return <TableLoaderComponent />;
    }
    return (
      <TableLayout thead={history_table_thead}>
        {isSuccess && data.histories.map((row) => <RowComponent row={row} key={row.id} />)}
      </TableLayout>
    );
  };

  return (
    <ModalLayout props={modalProps} buttons={<ButtonsComponent />}>
      <HistoryTable />
    </ModalLayout>
  );
}
