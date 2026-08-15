import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";
import RecordService from "../../shared/api/services/record-service";

export function useUploadDoc() {
  const { mutate: uploadDoc, isPending: uploadPending } = useMutation({
    mutationFn: RecordService.bulkCreateRecords,
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
  return { uploadDoc, uploadPending };
}
