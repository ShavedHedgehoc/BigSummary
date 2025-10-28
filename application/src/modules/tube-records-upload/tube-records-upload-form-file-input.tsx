import { Box, Button, FormControl, Typography } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";
import { useTubeRecordsUploadFormStore } from "./store/use-records-upload-form-store";

export default function TubeRecordsUploadFormFileInput() {
  const filename = useTubeRecordsUploadFormStore(useShallow((state) => state.fileName));
  const file = useTubeRecordsUploadFormStore(useShallow((state) => state.file));
  const setFileName = useTubeRecordsUploadFormStore(useShallow((state) => state.setFileName));
  const setFile = useTubeRecordsUploadFormStore(useShallow((state) => state.setFile));
  const clearData = useTubeRecordsUploadFormStore(useShallow((state) => state.clearData));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setFile(e.target.files?.[0]);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography level="body-sm">{filename.split("\\").slice(-1)[0] || "Файл не выбран"}</Typography>
      <FormControl size="sm">
        <input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
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
