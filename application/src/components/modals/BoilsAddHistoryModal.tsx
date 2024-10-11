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
  FormControl,
  Textarea,
  FormHelperText,
} from "@mui/joy";
import { IBoilsListItem } from "../../types";

interface BoilAddHistoryModalProps {
  open: boolean;
  stateDescription: string | null;
  historyNote: string;
  boil: IBoilsListItem;
  onClose(): void;
  processRecord(): void;
  setHistoryNote(val: string): void;
}

export default function BoilAddHistoryModal(props: BoilAddHistoryModalProps) {
  return (
    <React.Fragment>
      <Modal
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
          <ModalDialog
            layout="center"
            variant="solid"
            sx={[
              {
                width: "800px",
                borderRadius: "sm",
                borderWidth: "1px",
                backgroundColor: "var(--joy-palette-background-level1)",
              },
            ]}
          >
            <DialogTitle sx={{ color: "var(--joy-palette-text-secondary)" }}>Добавление записи</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography level="body-sm">Партия: {props.boil.value}</Typography>
                  <Typography level="body-sm"> Статус: "{props.stateDescription}" </Typography>
                </Box>
                <Box>
                  <FormControl size="sm">
                    <Textarea
                      placeholder="Введите комментарий..."
                      minRows={4}
                      size="sm"
                      required
                      value={props.historyNote}
                      onChange={(e) => props.setHistoryNote(e.target.value)}
                      sx={[
                        {
                          "&:focus-within": {
                            "--Textarea-focusedHighlight": "var(--joy-palette-neutral)",
                          },
                        },
                        { mb: 1 },
                      ]}
                      endDecorator={
                        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", pb: 0.5, pr: 0.5 }}>
                          <Button color="neutral" variant="outlined" size="sm" onClick={() => props.setHistoryNote("")}>
                            <Typography level="body-xs">Очистить</Typography>
                          </Button>
                        </Box>
                      }
                    />
                    <FormHelperText>
                      <Typography level="body-xs">Для внесения записи комментарий должен быть заполнен!</Typography>
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1 }}>
                  <Button
                    color="neutral"
                    variant="outlined"
                    // startDecorator={<CachedIcon />}
                    size={"sm"}
                    sx={{ fontWeight: "normal", fontSize: "small" }}
                    disabled={props.historyNote === ""}
                    onClick={() => {
                      props.onClose();
                      props.processRecord();
                    }}
                  >
                    Установить
                  </Button>
                  <Button
                    color="neutral"
                    variant="outlined"
                    // startDecorator={<CachedIcon />}
                    size={"sm"}
                    sx={{ fontWeight: "normal", fontSize: "small" }}
                    onClick={() => props.onClose()}
                  >
                    Отмена
                  </Button>
                </Box>
              </Box>
            </DialogContent>
            <ModalClose variant="outlined" />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
