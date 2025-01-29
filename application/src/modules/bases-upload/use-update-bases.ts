import { useMutation } from "@tanstack/react-query";
import BaseService from "../../shared/api/services/base-service";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../../shared/resources/client-messages";
import handleError from "../../shared/api/http/handleError";

export function useUpdateBases() {
  const { mutate: updateBases, isPending } = useMutation({
    mutationFn: BaseService.bulkUpdateBases,
    onSuccess: () => {
      enqueueSnackbar(ClientMessages.BASES_SUCCESFULL_UPDATED, {
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
  return { updateBases, isPending };
}
