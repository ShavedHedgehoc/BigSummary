import * as React from "react";
import UniversalProcessModal, { UniversalProcessModalProps } from "../../shared/components/universal-process-modal";
import { useBoilsUploadValidateModalStore } from "./store/use-boils-upload-validate-modal-store";
import { useShallow } from "zustand/react/shallow";
import { Box, CircularProgress, Typography } from "@mui/joy";

export default function BoilsUploadValidateModal() {
  const open = useBoilsUploadValidateModalStore(useShallow((state) => state.open));

  const content = (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <CircularProgress color="success" size="sm" value={75} />
        <Typography>Проверяю файл...</Typography>
      </Box>
    </React.Fragment>
  );
  const props: UniversalProcessModalProps = {
    open: open,
    minWidth: 300,
    title: "",
    content: content,
  };
  return (
    <React.Fragment>
      <UniversalProcessModal {...props} />
    </React.Fragment>
  );
}
