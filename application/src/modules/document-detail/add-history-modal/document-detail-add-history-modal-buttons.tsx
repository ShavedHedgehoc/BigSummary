import { Box, Button } from "@mui/joy";
import { useDocumentDetailAddHistoryModalStore } from "../store/use-document-detail-add-history-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useCreateHistoryDirect } from "../../../shared/api/use-create-history-direct";
import { useDocumentDetailAddHistoryModalFormStore } from "../store/use-document-detail-add-history-modal-form-store";

export default function DocumentDetailAddHistoryModalButtons() {
  const setOpen = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.setOpen));
  const row = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.row));
  const user_id = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.user_id));
  const historyType = useDocumentDetailAddHistoryModalFormStore(useShallow((state) => state.selectedHistoryType));
  const historyNote = useDocumentDetailAddHistoryModalFormStore(useShallow((state) => state.historyNote));
  const setHistoryNote = useDocumentDetailAddHistoryModalFormStore(useShallow((state) => state.setHistoryNote));
  const addHistoryDirect = useCreateHistoryDirect();

  const handleCloseButtonClick = () => {
    setOpen(false);
    setHistoryNote("");
  };

  const handleAddButtonClick = () => {
    setOpen(false);
    if (row) {
      const data: AddHistoryDto = {
        record_id: row.id,
        boil_value: row.boil,
        historyType: historyType,
        userId: user_id,
        employeeId: null,
        note: "Внесено с помощью Godmode",
        history_note: historyNote === "" ? null : historyNote,
      };
      addHistoryDirect(data);
    }
    setHistoryNote("");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1 }}>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => handleCloseButtonClick()}
      >
        Закрыть
      </Button>

      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => handleAddButtonClick()}
      >
        Записать
      </Button>
    </Box>
  );
}
