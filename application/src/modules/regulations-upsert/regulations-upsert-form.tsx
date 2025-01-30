import { Box } from "@mui/system";
import * as React from "react";
import FormCard from "../../shared/ui/form-card";
import RegulationsUpsertFormFileInput from "./regulations-upsert-form-file-input";
import RegulationsUpsertFormValidator from "./regulations-upsert-form-validator";
import RegulationsUpsertFormLoader from "./regulations-upsert-form-loader";

export default function RegulationsUpsertForm() {
  return (
    <React.Fragment>
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column", width: "100%" }}>
        <FormCard props={{ title: "Выбор файла", grow: true }}>
          <RegulationsUpsertFormFileInput />
        </FormCard>
        <FormCard props={{ title: "Валидация", grow: true }}>
          <RegulationsUpsertFormValidator />
        </FormCard>
        <FormCard props={{ title: "Загрузка", grow: true }}>
          <RegulationsUpsertFormLoader />
        </FormCard>
      </Box>
    </React.Fragment>
  );
}
