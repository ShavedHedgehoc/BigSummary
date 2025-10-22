import { Box, Button, FormControl, Typography } from "@mui/joy";
import { useBoilsUploadFormStore } from "./store/use-boils-upload-form-store";
import { useShallow } from "zustand/shallow";

export default function BoilsUploadFormFileInput() {
  const filename = useBoilsUploadFormStore(useShallow((state) => state.fileName));
  const file = useBoilsUploadFormStore(useShallow((state) => state.file));
  const setFileName = useBoilsUploadFormStore(useShallow((state) => state.setFileName));
  const setFile = useBoilsUploadFormStore(useShallow((state) => state.setFile));
  const clearData = useBoilsUploadFormStore(useShallow((state) => state.clearData));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setFile(e.target.files?.[0]);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography level="body-sm">{filename.split("\\").slice(-1)[0] || "Файл не выбран"}</Typography>
      <FormControl size="sm">
        <input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-excel,application/vnd.ms-excel.sheet.macroEnabled.12"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          value={filename}
          disabled={file !== undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileSelect(e)}
        />
        <label htmlFor="raised-button-file">
          <Button
            color="neutral"
            variant="outlined"
            size="sm"
            component="span"
            disabled={file !== undefined}
            sx={{
              display: file !== undefined ? "none" : "flex",
              fontWeight: "normal",
              fontSize: "small",
              width: "200px",
            }}
          >
            Выберите файл
          </Button>
        </label>

        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          disabled={file === undefined}
          sx={{
            display: file === undefined ? "none" : "flex",
            fontWeight: "normal",
            fontSize: "small",
            width: "200px",
          }}
          onClick={() => clearData()}
        >
          Очистить
        </Button>
      </FormControl>
    </Box>
  );
}
