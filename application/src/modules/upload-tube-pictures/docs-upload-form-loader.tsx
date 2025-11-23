import { Box, Button, Typography } from "@mui/joy";

import { useShallow } from "zustand/react/shallow";

// import UploadPendingModal from "../../shared/components/upload-pending-modal";

import { useUploadTubePicturesFormStore } from "./store/use-upload-tube-pictures-form-store";
import React from "react";
import { useUploadPicture } from "./use-upload-picture";
import UploadPendingModal from "../../shared/components/upload-pending-modal";

export default function UploadTubePicturesFormLoader() {
  const { uploadPicture, uploadPending } = useUploadPicture();
  const file = useUploadTubePicturesFormStore(useShallow((state) => state.file));
  const clearData = useUploadTubePicturesFormStore(useShallow((state) => state.clearData));

  const upload = () => {
    if (file) {
      uploadPicture(file);
    }
    clearData();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography level="body-sm" color="neutral">
          Загрузить
        </Typography>

        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          component="span"
          // disabled={!file || uploadPending}
          disabled={!file}
          sx={{
            display: "flex",
            fontWeight: "normal",
            fontSize: "small",
            width: "200px",
          }}
          onClick={() => upload()}
        >
          Загрузка
        </Button>
      </Box>
      <UploadPendingModal open={uploadPending} />
    </React.Fragment>
  );
}
