import * as React from "react";
import { Box } from "@mui/joy";
import FormCard from "../../shared/ui/form-card";
import DocsUploadFormPlantSelector from "./docs-upload-form-plant-selector";
import DocsUploadFormdDateInput from "./docs-upload-form-date-selector";
import DocsUploadFormUpdateSwitch from "./docs-upload-form-update-switch";
import DocsUploadFormFileInput from "./docs-upload-form-file-input";
import DocsUploadFormValidator from "./docs-upload-form-validator";
import DocsUploadFormLoader from "./docs-upload-form-loader";
import { useAuthStore } from "../auth/store/auth-store";
import { useShallow } from "zustand/react/shallow";
import { useDocsUploadFormStore } from "./store/use-docs-upload-form-store";
import { DashFilterParams } from "../dash/dash-filter-params";

export default function DocsUploadForm() {
  const user = useAuthStore(useShallow((state) => state.user));
  const setSelectedPlant = useDocsUploadFormStore(useShallow((state) => state.setSelectedPlant));
  const plantSelectorOptions = useDocsUploadFormStore(useShallow((state) => state.plantSelectorOptions));
  const changeFilter = useDocsUploadFormStore(useShallow((state) => state.changeFilter));

  if (user && plantSelectorOptions.length) {
    const plant_id = user?.settings?.plant_id || plantSelectorOptions[0].id;
    setSelectedPlant(plant_id);
    changeFilter({ key: DashFilterParams.PLANT, value: "", values: [plant_id] });
  }

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
