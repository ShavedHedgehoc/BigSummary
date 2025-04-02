import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";
import TubeRecordsService from "../../shared/api/services/tube-records-service";

export function useUploadTubeRecords() {
  const { mutate: uploadTubeRecords, isPending: uploadPending } = useMutation({
    mutationFn: TubeRecordsService.bulkCreateTubeRecords,
    onSuccess: () => {
      enqueueSnackbar(ClientMessages.DOCUMENT_SUCCESFULL_UPLOAD, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
      }
    },
  });
  return { uploadTubeRecords, uploadPending };
}
