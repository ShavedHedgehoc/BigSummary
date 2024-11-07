import * as React from "react";
import { Box, Button, Typography, FormControl, Textarea, FormHelperText } from "@mui/joy";

import ModalLayout, { ModalLayoutProps } from "../../shared/layouts/modal-layout";

import { useShallow } from "zustand/shallow";
import { Context } from "../../main";

import { useAddBoilModalStore } from "./store/use-add-boil-modal-store";
import { useBoilHistoryNoteStore } from "./store/use-boil-history-note-store";
import { useCreateHistory } from "../../shared/api/use-create-history";

const ContentComponent = () => {
  const historyNote = useBoilHistoryNoteStore(useShallow((state) => state.historyNote));
  const setHistoryNote = useBoilHistoryNoteStore(useShallow((state) => state.setHistoryNote));
  const noteRequired = useAddBoilModalStore(useShallow((state) => state.noteRequired));
  const title = useAddBoilModalStore(useShallow((state) => state.title));

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography level="body-sm">{title}</Typography>
      </Box>
      <Box>
        <FormControl size="sm">
          <Textarea
            placeholder="Введите комментарий..."
            minRows={4}
            size="sm"
            required
            value={historyNote}
            onChange={(e) => setHistoryNote(e.target.value)}
            sx={[
              {
                "&:focus-within": {
                  "--Textarea-focusedHighlight": "var(--joy-palette-neutral)",
                },
              },
              { mb: 1, display: "flex", flexGrow: 1 },
            ]}
            endDecorator={
              <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", pb: 0.5, pr: 0.5 }}>
                <Button
                  color="neutral"
                  variant="outlined"
                  size="sm"
                  disabled={historyNote === ""}
                  onClick={() => setHistoryNote("")}
                >
                  <Typography level="body-xs">Очистить</Typography>
                </Button>
              </Box>
            }
          />
          <FormHelperText>
            <Typography level="body-xs">
              {noteRequired ? "Для внесения записи комментарий должен быть заполнен!" : ""}
            </Typography>
          </FormHelperText>
        </FormControl>
      </Box>
    </React.Fragment>
  );
};

const CancelButton = () => {
  const setOpen = useAddBoilModalStore(useShallow((state) => state.setOpen));
  const setHistoryNote = useBoilHistoryNoteStore(useShallow((state) => state.setHistoryNote));
  const handleCancelButtonClick = () => {
    setOpen(false);
    setHistoryNote("");
  };
  return (
    <Button
      color="neutral"
      variant="outlined"
      size={"sm"}
      sx={{ fontWeight: "normal", fontSize: "small" }}
      onClick={() => handleCancelButtonClick()}
    >
      Отмена
    </Button>
  );
};

const SetButton = () => {
  const { store } = React.useContext(Context);
  const setOpen = useAddBoilModalStore(useShallow((state) => state.setOpen));
  const boil_value = useAddBoilModalStore(useShallow((state) => state.boil_value));
  const state = useAddBoilModalStore(useShallow((state) => state.state));
  const historyNote = useBoilHistoryNoteStore(useShallow((state) => state.historyNote));
  const setHistoryNote = useBoilHistoryNoteStore(useShallow((state) => state.setHistoryNote));
  const noteRequired = useAddBoilModalStore(useShallow((state) => state.noteRequired));
  const addHistory = useCreateHistory();
  const handleSetButtonClick = () => {
    const data: AddHistoryDto = {
      record_id: null,
      boil_value: boil_value,
      historyType: state,
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
      history_note: historyNote === "" ? null : historyNote,
    };
    setOpen(false);
    addHistory(data);
    setHistoryNote("");
  };
  return (
    <Button
      color="neutral"
      variant="outlined"
      size={"sm"}
      sx={{ fontWeight: "normal", fontSize: "small" }}
      disabled={historyNote === "" && noteRequired}
      onClick={() => handleSetButtonClick()}
    >
      Установить
    </Button>
  );
};

const ButtonsComponent = () => {
  return (
    <React.Fragment>
      <SetButton />
      <CancelButton />
    </React.Fragment>
  );
};

export default function AddBoilRecordModal() {
  const open = useAddBoilModalStore(useShallow((state) => state.open));
  const setOpen = useAddBoilModalStore(useShallow((state) => state.setOpen));
  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Добавление записи",
    height: 400,
    minHeight: 0,
    width: 800,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<ButtonsComponent />}>
      <ContentComponent />
    </ModalLayout>
  );
}
