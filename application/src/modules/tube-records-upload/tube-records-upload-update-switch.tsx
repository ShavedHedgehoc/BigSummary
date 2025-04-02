import { useShallow } from "zustand/shallow";
import { Box } from "@mui/joy";
import { Typography } from "@mui/joy";
import FormSwitcher, { FormSwitcherProps } from "../../shared/ui/form-switcher";
import { useTubeRecordsUploadFormStore } from "./store/use-records-upload-form-store";

export default function TubeRecordsUploadFormUpdateSwitch() {
  const update = useTubeRecordsUploadFormStore(useShallow((state) => state.update));
  const setUpdate = useTubeRecordsUploadFormStore(useShallow((state) => state.setUpdate));

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
