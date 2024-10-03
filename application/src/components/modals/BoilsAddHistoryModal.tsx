import * as React from "react";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Typography,
} from "@mui/joy";
import { IBoilsListItem } from "../../types";
import { Context } from "../../main";

interface BoilAddHistoryModalProps {
  open: boolean;
  onClose(): void;
  state: string;
  boil: IBoilsListItem;
  processRecord(): void;
}

export default function BoilAddHistoryModal(props: BoilAddHistoryModalProps) {
  const { store } = React.useContext(Context);
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
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Typography level="body-md" color="danger">
                  ВНИМАНИЕ!!!
                </Typography>
                <Typography level="body-sm">
                  Вы хотите установить для основы партии {props.boil.value} статус "
                  {
                    store.HistoryTypeStore.historyTypes.find((historeTypeName) => historeTypeName.value === props.state)
                      ?.description
                  }
                  " ...
                </Typography>
                <Typography level="body-sm">Установить?</Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
                  <Button
                    color="success"
                    fullWidth
                    // startDecorator={<CachedIcon />}
                    size={"sm"}
                    sx={{ fontWeight: "normal", fontSize: "small" }}
                    onClick={() => {
                      props.onClose();
                      props.processRecord();
                    }}
                  >
                    Да
                  </Button>

                  <Button
                    color="danger"
                    fullWidth
                    // startDecorator={<CachedIcon />}
                    size={"sm"}
                    sx={{ fontWeight: "normal", fontSize: "small" }}
                    onClick={() => props.onClose()}
                  >
                    Нет
                  </Button>
                </Box>
              </Box>
            </DialogContent>
            <ModalClose />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
