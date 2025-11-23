import * as React from "react";
import { Box } from "@mui/joy";
import FormCard from "../../shared/ui/form-card";

import DocsUploadFormLoader from "./docs-upload-form-loader";
import UploadTubePicturesFormFileInput from "./upload-tube-pictures-form-file-input";

export default function UploadTubePicturesForm() {
  return (
    <React.Fragment>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column", width: "100%" }}>
        <FormCard props={{ title: "Выбор файла", grow: true }}>
          <UploadTubePicturesFormFileInput />
        </FormCard>

        <FormCard props={{ title: "Загрузка", grow: true }}>
          <DocsUploadFormLoader />
        </FormCard>
      </Box>
    </React.Fragment>
  );
}
