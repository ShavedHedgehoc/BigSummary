import * as React from "react";
import { Context } from "../../main";
import { HistoryCreateDirectDto } from "../../services/HistoryService";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { observer } from "mobx-react-lite";

interface GoModeModalProps {
  open: boolean;
  onClose(): void;
}

const ObservedSelector = observer(function Selector() {
  const { store } = React.useContext(Context);
  return (
    store.HistoryTypeStore.historyTypes.length > 0 &&
    store.HistoryTypeStore.currentHystoryTypeExists && (
      <Select
        //  size={props.mobile ? "lg" : "sm"}
        size="sm"
        // sx={[props.mobile && { width: "100%" }]}
        placeholder="Выберите статус"
        defaultValue={store.HistoryTypeStore.currentHistoryType?.id}
        slotProps={{
          button: { sx: { whiteSpace: "nowrap" } },
          listbox: { sx: { zIndex: 999999 } },
        }}
        onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
          event && newValue && store.HistoryTypeStore.setCurrentHistoryType(newValue);
        }}
      >
        {store.HistoryTypeStore.selectorOptions.map((historyType) => (
          <Option value={historyType.id} key={historyType.id}>
            {historyType.description}
          </Option>
        ))}
      </Select>
    )
  );
});

export default function GodModeModal(props: GoModeModalProps) {
  const GodModeForm = () => {
    const { store } = React.useContext(Context);

    const addHistory = () => {
      if (store.RecordDetailStore.record && store.HistoryTypeStore.currentHistoryType) {
        const data: HistoryCreateDirectDto = {
          record_id: store.RecordDetailStore.record.id,
          boil_value: store.RecordDetailStore.record.boil ? store.RecordDetailStore.record.boil : null,
          historyType: store.HistoryTypeStore.currentHistoryType.value,
          userId: store.AuthStore.user.id,
          employeeId: null,
          note: "Создано из тестовой обработки",
          history_note: null,
        };
        store.HistoryStore.createHistoryDirect(data)
          .then(() => {
            if (store.RecordDetailStore.record) {
              store.RecordDetailStore.updateHistories(store.RecordDetailStore.record.id.toString());
            }
          })
          .then(() => props.onClose());
      }
    };
    return (
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Box>
            <ObservedSelector />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
            <Button
              color="success"
              fullWidth
              // startDecorator={<CachedIcon />}
              size={"sm"}
              sx={{ fontWeight: "normal", fontSize: "small" }}
              onClick={() => addHistory()}
            >
              Записать
            </Button>

            <Button
              color="danger"
              fullWidth
              // startDecorator={<CachedIcon />}
              size={"sm"}
              sx={{ fontWeight: "normal", fontSize: "small" }}
              onClick={() => props.onClose()}
            >
              Отмена
            </Button>
          </Box>
        </Box>
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={props.open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
          if (reason === "closeClick") {
            props.onClose();
          }
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999,
        }}
      >
        <ModalOverflow>
          <ModalDialog layout="center">
            <DialogTitle>Добавление записи</DialogTitle>
            <DialogContent>
              <Typography level="body-xs" color="danger">
                ВНИМАНИЕ!!! Использовать только в тестовом режиме!
              </Typography>
            </DialogContent>
            <GodModeForm />
            <ModalClose />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
