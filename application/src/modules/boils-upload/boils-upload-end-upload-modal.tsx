import * as React from "react";
import { useBoilsUploadUploadModalStore } from "./store/use-boils-upload-upload-modal-store";
import { useShallow } from "zustand/shallow";
import UniversalProcessModal, { UniversalProcessModalProps } from "../../shared/components/universal-process-modal";
import { Box, Button, Typography } from "@mui/joy";
import { useBoilsUploadEndUploadModalStore } from "./store/use-boils-upload-end-upload-modal";

import { useBoilsUploadFormStore } from "./store/use-boils-upload-form-store";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

export default function BoilsUploadEndUploadModal() {
  const open = useBoilsUploadEndUploadModalStore(useShallow((state) => state.open));
  const setOpen = useBoilsUploadEndUploadModalStore(useShallow((state) => state.setOpen));
  const fail = useBoilsUploadUploadModalStore(useShallow((state) => state.fail));
  const resetUploadModal = useBoilsUploadUploadModalStore(useShallow((state) => state.reset));
  const clearData = useBoilsUploadFormStore(useShallow((state) => state.clearData));
  const handleOkClick = () => {
    setOpen(false);
    resetUploadModal();
    clearData();
  };

  const content = (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
        {fail > 0 ? (
          <ReportProblemOutlinedIcon color="warning" sx={{ fontSize: "xl4" }} />
        ) : (
          <DoneOutlinedIcon color="success" sx={{ fontSize: "xl4" }} />
        )}

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <Typography>Загрузка завершена {fail > 0 ? "с ошибками!" : "успешно!"}</Typography>
          <Button
            color="neutral"
            onClick={() => handleOkClick()}
            size="lg"
            variant="outlined"
            sx={{ fontSize: "lg", minWidth: 200 }}
          >
            Ok
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
  const props: UniversalProcessModalProps = {
    open: open,
    // open: true,
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
