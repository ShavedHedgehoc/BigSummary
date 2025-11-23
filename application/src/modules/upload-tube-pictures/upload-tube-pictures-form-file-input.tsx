import { Box, Button, FormControl, Typography } from "@mui/joy";

import { useShallow } from "zustand/react/shallow";
import { useUploadTubePicturesFormStore } from "./store/use-upload-tube-pictures-form-store";

export default function UploadTubePicturesFormFileInput() {
  const filename = useUploadTubePicturesFormStore(useShallow((state) => state.fileName));
  const file = useUploadTubePicturesFormStore(useShallow((state) => state.file));
  const setFileName = useUploadTubePicturesFormStore(useShallow((state) => state.setFileName));
  const setFile = useUploadTubePicturesFormStore(useShallow((state) => state.setFile));
  const clearData = useUploadTubePicturesFormStore(useShallow((state) => state.clearData));

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(e.target.value);
      setFile(files[0]);
    }
    // setFileName(e.target.value);
    // setFile(e.target.files?.[0]);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography level="body-sm">{filename.split("\\").slice(-1)[0] || "Файл не выбран"}</Typography>
      <FormControl size="sm">
        <input
          // accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          accept=".png, .jpg, .jpeg"
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
