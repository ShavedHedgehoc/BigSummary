import { Box } from "@mui/system";
import * as React from "react";
import FormCard from "../../shared/ui/form-card";
import DocsUploadFormPlantSelector from "./docs-upload-form-plant-selector";
import DocsUploadFormdDateInput from "./docs-upload-form-date-selector";
import DocsUploadFormUpdateSwitch from "./docs-upload-form-update-switch";
import DocsUploadFormFileInput from "./docs-upload-form-file-input";
import DocsUploadFormValidator from "./docs-upload-form-validator";
import DocsUploadFormLoader from "./docs-upload-form-loader";

export default function DocsUploadForm() {
  return (
    <React.Fragment>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 2 }}>
          <FormCard props={{ title: "Данные загрузки", grow: true }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <DocsUploadFormPlantSelector />
              <DocsUploadFormdDateInput />
            </Box>
          </FormCard>
          <FormCard props={{ title: "Режим загрузки", grow: false, width: 350, centerTitle: true }}>
            <DocsUploadFormUpdateSwitch />
          </FormCard>
        </Box>
        <FormCard props={{ title: "Выбор файла", grow: true }}>
          <DocsUploadFormFileInput />
        </FormCard>
        <FormCard props={{ title: "Валидация", grow: true }}>
          <DocsUploadFormValidator />
        </FormCard>
        <FormCard props={{ title: "Загрузка", grow: true }}>
          <DocsUploadFormLoader />
        </FormCard>
      </Box>
    </React.Fragment>
  );
}
