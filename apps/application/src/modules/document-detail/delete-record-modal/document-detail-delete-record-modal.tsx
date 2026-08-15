import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import { Box, Button, Typography } from "@mui/joy";
import ModalLayout, { ModalLayoutProps } from "../../../shared/layouts/modal-layout";
import { useDocumentDetailDeleteRecordlModalStore } from "../store/use-document-detail-delete-record-modal-store";
import { useDeleteRecord } from "../use-delete-record";

const ContentComponent = () => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography level="body-sm">Вы действительно хотите удалить строку?</Typography>
      </Box>
    </React.Fragment>
  );
};

const CancelButton = () => {
  const setOpen = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.setOpen));
  const setId = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.setId));
  const handleCancelButtonClick = () => {
    setOpen(false);
    setId(null);
  };
  return (
    <Box sx={{ width: "50%" }}>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small", width: "100%" }}
        onClick={() => handleCancelButtonClick()}
      >
        Отмена
      </Button>
    </Box>
  );
};

const DeleteButton = () => {
  const { deleteRecord, deletePending } = useDeleteRecord();
  const id = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.id));
  const setId = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.setId));
  const setOpen = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.setOpen));

  const handleDeleteButtonClick = () => {
    setOpen(false);
    id && deleteRecord(id);
    setId(null);
  };

  return (
    <Box sx={{ width: "50%" }}>
      <Button
        color="danger"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small", width: "100%" }}
        disabled={deletePending}
        onClick={() => handleDeleteButtonClick()}
      >
        Удалить
      </Button>
    </Box>
  );
};

const ButtonsComponent = () => {
  return (
    <React.Fragment>
      <DeleteButton />
      <CancelButton />
    </React.Fragment>
  );
};

export default function DocumentDetailDeleteRecordModal() {
  const open = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.open));
  const setOpen = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Удаление строки",
    height: 200,
    minHeight: 0,
    width: 300,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<ButtonsComponent />}>
      <ContentComponent />
    </ModalLayout>
  );
}
