import { Box, Button, Typography } from "@mui/joy";
import { useShallow } from "zustand/shallow";
import UploadPendingModal from "../../shared/components/upload-pending-modal";
import { useUploadTubeRecords } from "./use-upload-tube-records";
import { useTubeRecordsUploadFormStore } from "./store/use-records-upload-form-store";
import { ITubeRecordsUploadData } from "../../shared/api/services/tube-records-service";

export default function TubeRecordsUploadFormLoader() {
  const { uploadTubeRecords, uploadPending } = useUploadTubeRecords();
  const formData = useTubeRecordsUploadFormStore(useShallow((state) => state.formData));
  const dataForUpload = useTubeRecordsUploadFormStore(useShallow((state) => state.dataForUpload));
  const isValid = useTubeRecordsUploadFormStore(useShallow((state) => state.isValid));
  const clearData = useTubeRecordsUploadFormStore(useShallow((state) => state.clearData));
  const update = useTubeRecordsUploadFormStore(useShallow((state) => state.update));

  const upload = async () => {
    if (formData.dateForUpload && dataForUpload.length > 0) {
      const data: ITubeRecordsUploadData = {
        summaryDate: formData.dateForUpload,
        update: update,
        rows: dataForUpload,
      };
      uploadTubeRecords(data);
    }

    clearData();
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography level="body-sm" color="neutral">
          Загрузите сводку
        </Typography>

        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          component="span"
          disabled={!isValid || uploadPending}
          sx={{
            display: "flex",
            fontWeight: "normal",
            fontSize: "small",
            width: "200px",
          }}
          onClick={() => upload()}
        >
          Загрузка
        </Button>
      </Box>
      <UploadPendingModal open={uploadPending} />
    </>
  );
}
