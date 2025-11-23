import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";
import UploadPictureService from "../../shared/api/services/file-upload-service";

export function useUploadPicture() {
  const { mutate: uploadPicture, isPending: uploadPending } = useMutation({
    mutationFn: UploadPictureService.uploadFile,
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
  return { uploadPicture, uploadPending };
}
