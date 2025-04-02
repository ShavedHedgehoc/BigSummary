import * as React from "react";
import { Box } from "@mui/joy";
import FormCard from "../../shared/ui/form-card";
import TubeRecordsUploadFormDateInput from "./tube-records-upload-form-date-input";
import TubeRecordsUploadFormUpdateSwitch from "./tube-records-upload-update-switch";
import TubeRecordsUploadFormFileInput from "./tube-records-upload-form-file-input";
import TubeRecordsUploadFormValidator from "./tube-records-upload-form-validator";
import TubeRecordsUploadFormLoader from "./tube-records-upload-form-loader";

export default function TubeRecordsUploadForm() {
  return (
    <React.Fragment>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 2 }}>
          <FormCard props={{ title: "Данные загрузки", grow: true }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <TubeRecordsUploadFormDateInput />
            </Box>
          </FormCard>
          <FormCard props={{ title: "Режим загрузки", grow: false, width: 350, centerTitle: true }}>
            <TubeRecordsUploadFormUpdateSwitch />
          </FormCard>
        </Box>
        <FormCard props={{ title: "Выбор файла", grow: true }}>
          <TubeRecordsUploadFormFileInput />
        </FormCard>
        <FormCard props={{ title: "Валидация", grow: true }}>
          <TubeRecordsUploadFormValidator />
        </FormCard>
        <FormCard props={{ title: "Загрузка", grow: true }}>
          <TubeRecordsUploadFormLoader />
        </FormCard>
      </Box>
    </React.Fragment>
  );
}
