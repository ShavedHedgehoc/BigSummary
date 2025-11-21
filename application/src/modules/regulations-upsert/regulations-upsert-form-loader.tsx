import { Box, Button, Typography } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";
import UploadPendingModal from "../../shared/components/upload-pending-modal";
import { useRegulationsUpsertFormStore } from "./store/use-regulations-upsert-form-store";
import { useUpdateRegulations } from "./use-update-regulations";

export default function RegulationsUpsertFormLoader() {
  const { updateRegulations, isPending } = useUpdateRegulations();

  const dataForUpload = useRegulationsUpsertFormStore(useShallow((state) => state.dataForUpload));
  const isValid = useRegulationsUpsertFormStore(useShallow((state) => state.isValid));
  const clearData = useRegulationsUpsertFormStore(useShallow((state) => state.clearData));

  const upload = async () => {
    updateRegulations(dataForUpload);
    clearData();
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography level="body-sm" color="neutral">
          Обновите регламент
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
