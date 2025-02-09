import ModalLayout from "../../../shared/layouts/modal-layout";
import TableLayout from "../../../shared/layouts/table-layout";
import { useRecordHistories } from "../../../shared/api/use-record-histories";
import { useShallow } from "zustand/shallow";
import TableLoaderComponent from "../../../shared/components/table-loader";
import { useDocumentDetailHistoryModalStore } from "../store/use-document-detail-history-modal-store";
import DocumentDetailHistoryModalRow from "./document-detail-history-modal-row";
import { Box, Button } from "@mui/joy";
import { useDocumentDetailAddHistoryModalStore } from "../store/use-document-detail-add-history-modal-store";

export default function DocumentDetailHistoryModal() {
  const open = useDocumentDetailHistoryModalStore(useShallow((state) => state.open));
  const record_id = useDocumentDetailHistoryModalStore(useShallow((state) => state.record_id));
  const title = useDocumentDetailHistoryModalStore(useShallow((state) => state.title));
  const addButtonEnabled = useDocumentDetailHistoryModalStore(useShallow((state) => state.addButtonEnabled));
  const setOpen = useDocumentDetailHistoryModalStore(useShallow((state) => state.setOpen));
  const { isPending, data, isSuccess } = useRecordHistories(record_id);

  const setOpenAddModal = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.setOpen));
  // const setRecordId = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.setRecordId));

  const history_table_thead: TheadProperties[] = [
    { width: 50, padding: "18px 6px", value: "Дата" },
    { width: 50, padding: "18px 6px", value: "Время" },
    { width: 100, padding: "18px 6px", value: "Статус записи" },
    { width: 80, padding: "18px 6px", value: "Автор записи" },
    { width: 80, padding: "18px 6px", value: "Комментарий" },
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

  const ButtonsComponent = () => {
    const handleAddButtonClick = () => {
      // record_id && setRecordId(record_id);
      setOpenAddModal(true);
    };
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
        {addButtonEnabled && (
          <Button
            color="neutral"
            variant="outlined"
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            onClick={() => handleAddButtonClick()}
          >
            Добавить запись
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
      <TableLayout
        thead={
          addButtonEnabled
            ? [...history_table_thead, { width: 50, padding: "18px 6px", value: "Действия" }]
            : history_table_thead
        }
      >
        {isSuccess &&
          data.histories.map((row) => (
            <DocumentDetailHistoryModalRow row={row} godmode={addButtonEnabled} key={row.id} />
          ))}
      </TableLayout>
    );
  };

  return (
    <ModalLayout props={modalProps} buttons={<ButtonsComponent />}>
      <HistoryTable />
    </ModalLayout>
  );
}
