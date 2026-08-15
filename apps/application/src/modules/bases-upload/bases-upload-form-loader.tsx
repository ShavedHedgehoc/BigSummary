import { Box, Button, Typography } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";
import UploadPendingModal from "../../shared/components/upload-pending-modal";
import { useBasesUploadFormStore } from "./store/use-bases-upload-form-store";
import { useUpdateBases } from "./use-update-bases";

export default function BasesUploadFormLoader() {
  const { updateBases, isPending } = useUpdateBases();

  const dataForUpload = useBasesUploadFormStore(useShallow((state) => state.dataForUpload));
  const isValid = useBasesUploadFormStore(useShallow((state) => state.isValid));
  const clearData = useBasesUploadFormStore(useShallow((state) => state.clearData));

  const upload = async () => {
    updateBases({ bases: dataForUpload });
    clearData();
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography level="body-sm" color="neutral">
          Обновите основы
        </Typography>

        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          component="span"
          disabled={!isValid || isPending}
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
      <UploadPendingModal open={isPending} />
    </>
  );
}
