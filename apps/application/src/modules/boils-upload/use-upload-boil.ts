import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import DirectTraceService from "../../shared/api/services/direct-trace-service";

export function useUploadBoil() {
  const { mutateAsync: uploadBoil, isPending } = useMutation({
    mutationFn: DirectTraceService.uploadBoil,
    onSuccess: () => {},
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
      }
    },
  });
  return { uploadBoil, isPending };
}
