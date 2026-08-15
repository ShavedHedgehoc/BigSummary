import * as React from "react";
import { useBoilsUploadUploadModalStore } from "./store/use-boils-upload-upload-modal-store";
import { useShallow } from "zustand/react/shallow";
import UniversalProcessModal, { UniversalProcessModalProps } from "../../shared/components/universal-process-modal";
import { Box, CircularProgress, Typography } from "@mui/joy";

export default function BoilsUploadUploadModal() {
  const open = useBoilsUploadUploadModalStore(useShallow((state) => state.open));
  const toProcess = useBoilsUploadUploadModalStore(useShallow((state) => state.toProcess));
  const processed = useBoilsUploadUploadModalStore(useShallow((state) => state.processed));
  const fail = useBoilsUploadUploadModalStore(useShallow((state) => state.fail));

  const content = (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <CircularProgress color="success" size="sm" value={75} />
        <Typography>
          Обработано {processed} партий из {toProcess}
        </Typography>
        <Typography>Ошибок: {fail}</Typography>
      </Box>
    </React.Fragment>
  );
  const props: UniversalProcessModalProps = {
    open: open,
    minWidth: 500,
    title: "",
    content: content,
  };
  return (
    <React.Fragment>
      <UniversalProcessModal {...props} />
    </React.Fragment>
  );
}
