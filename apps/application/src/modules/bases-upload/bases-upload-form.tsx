import { Box } from "@mui/system";
import * as React from "react";
import FormCard from "../../shared/ui/form-card";
import BasesUploadFormFileInput from "./bases-upload-form-file-input";
import BasesUploadFormValidator from "./bases-upload-form-validator";
import BasesUploadFormLoader from "./bases-upload-form-loader";

export default function BasesUploadForm() {
  return (
    <React.Fragment>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column", width: "100%" }}>
        <FormCard props={{ title: "Выбор файла", grow: true }}>
          <BasesUploadFormFileInput />
        </FormCard>
        <FormCard props={{ title: "Валидация", grow: true }}>
          <BasesUploadFormValidator />
        </FormCard>
        <FormCard props={{ title: "Загрузка", grow: true }}>
          <BasesUploadFormLoader />
        </FormCard>
      </Box>
    </React.Fragment>
  );
}
