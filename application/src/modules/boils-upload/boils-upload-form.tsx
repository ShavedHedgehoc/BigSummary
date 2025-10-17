import * as React from "react";
import { Box } from "@mui/joy";
import FormCard from "../../shared/ui/form-card";
import BoilsUploadFormFileInput from "./boils-upload-form-file-input";
import BoilsUploadFormValidator from "./boils-upload-form-validator";
import BoilsUploadFormLoader from "./boils-upload-form-loader";

export default function BoilsUploadForm() {
  return (
    <React.Fragment>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column", width: "100%" }}>
        <FormCard props={{ title: "Выбор файла", grow: true }}>
          <BoilsUploadFormFileInput />
        </FormCard>
        <FormCard props={{ title: "Валидация", grow: true }}>
          <></>
          <BoilsUploadFormValidator />
        </FormCard>
        <FormCard props={{ title: "Загрузка", grow: true }}>
          <></>
          <BoilsUploadFormLoader />
        </FormCard>
      </Box>
    </React.Fragment>
  );
}
