import { useShallow } from "zustand/shallow";
import { useDocsUploadFormStore } from "./store/use-docs-upload-form-store";
import { Box } from "@mui/system";
import { Typography } from "@mui/joy";
import FormSwitcher, { FormSwitcherProps } from "../../shared/ui/form-switcher";

export default function DocsUploadFormUpdateSwitch() {
  const update = useDocsUploadFormStore(useShallow((state) => state.update));
  const setUpdate = useDocsUploadFormStore(useShallow((state) => state.setUpdate));

  const formSwitcherProps: FormSwitcherProps = {
    condition: update,
    onChange: (e) => setUpdate(e),
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: 1,
        alignItems: "center",
      }}
    >
      <FormSwitcher {...formSwitcherProps} />
      <Typography>{update ? "Добавление" : "Загрузка"}</Typography>
      <Typography level="body-xs">
        {update ? "Добавление строк в существующий документ" : "Создание нового документа"}
      </Typography>
    </Box>
  );
}
