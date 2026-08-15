import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import { Box, Button, Textarea, Typography } from "@mui/joy";
import ModalLayout, { ModalLayoutProps } from "../../../shared/layouts/modal-layout";
import { useDocumentDetailEditRecordlModalStore } from "../store/use-document-detail-edit-record-modal-store";

import ModalInputWithLabel from "../../../shared/ui/modal-input-with-label";
import { TableState } from "../../../shared/ui/table-state";
import { useUpdateRecord } from "../use-update-record";

const ContentComponent = () => {
  const row = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.row));
  const apparatus = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.apparatus));
  const setApparatus = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setApparatus));
  const can = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.can));
  const setCan = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setCan));
  const conveyor = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.conveyor));
  const setConveyor = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setConveyor));
  const plan = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.plan));
  const setPlan = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setPlan));
  const note = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.note));
  const setNote = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setNote));
  const setUpdated = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setUpdated));
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: 1,
              justifyContent: "flex-start",
            }}
          >
            <Box sx={{ display: "flex", paddingY: "4px", alignItems: "center", gap: 2 }}>
              <Typography level="body-sm">Код1С:</Typography>
              <Typography level="body-md">{row?.productId}</Typography>
            </Box>

            <Box sx={{ display: "flex", paddingY: "4px", alignItems: "center", gap: 2 }}>
              <Typography level="body-sm">Артикул:</Typography>
              <Typography level="body-md">{row?.product}</Typography>
            </Box>
            <Box sx={{ display: "flex", paddingY: "4px", alignItems: "center", gap: 2 }}>
              <Typography level="body-sm">Партия:</Typography>
              <Typography level="body-md">{row?.boil}</Typography>
            </Box>
            <Box sx={{ display: "flex", paddingY: "4px", alignItems: "center" }}>
              {row && <TableState text={row.state} state={row?.stateValue} />}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,

              alignSelf: "flex-end",
            }}
          >
            <ModalInputWithLabel
              label={"Аппарат:"}
              value={apparatus}
              onChange={(e) => {
                setApparatus(e);
                setUpdated(true);
              }}
              disabled={row?.apparatus === "-"}
            />
            <ModalInputWithLabel
              label={"Емкость:"}
              value={can}
              onChange={(e) => {
                setCan(e);
                setUpdated(true);
              }}
              disabled={row?.can === "-"}
            />
            <ModalInputWithLabel
              label={"Конвейер:"}
              value={conveyor}
              onChange={(e) => {
                setConveyor(e);
                setUpdated(true);
              }}
            />
            <ModalInputWithLabel
              label={"План:"}
              value={plan}
              onChange={(e) => {
                setPlan(e);
                setUpdated(true);
              }}
            />
          </Box>
        </Box>
        <Box>
          <Textarea
            minRows={4}
            size="sm"
            required
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setUpdated(true);
            }}
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
                  onClick={() => {
                    setNote("");
                    setUpdated(true);
                  }}
                >
                  <Typography level="body-xs">Очистить</Typography>
                </Button>
              </Box>
            }
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

const CancelButton = () => {
  const setOpen = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setOpen));
  const setUpdated = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setUpdated));
  const handleCancelButtonClick = () => {
    setOpen(false);
    setUpdated(false);
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
  const { updateRecord } = useUpdateRecord();

  const setOpen = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setOpen));
  const setRow = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setRow));
  const conveyor = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.conveyor));
  const plan = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.plan));
  const apparatus = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.apparatus));
  const can = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.can));
  const row = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.row));
  const note = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.note));
  const updated = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.updated));
  const setUpdated = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setUpdated));

  const handleSetButtonClick = () => {
    if (row) {
      const dto: UpdateRecordDto = {
        id: row.id,
        apparatus: apparatus,
        can: can,
        conveyor: conveyor,
        plan: plan,
        note: note,
      };
      updateRecord(dto);
    }

    setOpen(false);
    setUpdated(false);
    setRow(null);
  };

  return (
    <Button
      color="neutral"
      variant="outlined"
      size={"sm"}
      sx={{
        fontWeight: "normal",
        fontSize: "small",
      }}
      disabled={conveyor === "" || plan === "" || apparatus === "" || can === "" || !updated}
      onClick={() => handleSetButtonClick()}
    >
      Записать
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

export default function DocumentDetailEditRecordModal() {
  const open = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.open));
  const setOpen = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Редактирование строки",
    height: 400,
    minHeight: 0,
    width: 600,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<ButtonsComponent />}>
      <ContentComponent />
    </ModalLayout>
  );
}
