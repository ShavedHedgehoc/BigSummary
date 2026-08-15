import { Box, Button, Typography } from "@mui/joy";
import { useDocsUploadFormStore } from "./store/use-docs-upload-form-store";
import { useShallow } from "zustand/react/shallow";
import { useUploadDoc } from "./use-upload-doc";
import UploadPendingModal from "../../shared/components/upload-pending-modal";
import { IDocUploadData } from "../../shared/api/services/record-service";

export default function DocsUploadFormLoader() {
  const { uploadDoc, uploadPending } = useUploadDoc();
  const formData = useDocsUploadFormStore(useShallow((state) => state.formData));
  const dataForUpload = useDocsUploadFormStore(useShallow((state) => state.dataForUpload));
  const isValid = useDocsUploadFormStore(useShallow((state) => state.isValid));
  const clearData = useDocsUploadFormStore(useShallow((state) => state.clearData));
  const update = useDocsUploadFormStore(useShallow((state) => state.update));

  const upload = async () => {
    if (formData.plant && formData.dateForUpload && dataForUpload.length > 0) {
      const data: IDocUploadData = {
        plantId: formData.plant.toString(),
        summaryDate: formData.dateForUpload,
        update: update,
        rows: dataForUpload,
      };
      uploadDoc(data);
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
