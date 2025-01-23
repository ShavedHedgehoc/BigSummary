import { useMutation } from "@tanstack/react-query";
import BaseService from "./services/base-service";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../resources/client-messages";
import handleError from "./http/handleError";

export function useUpdateBases() {
  const { mutate: updateBases, isPending } = useMutation({
    mutationFn: BaseService.bulkUpdateBases,
    onSuccess: () => {
      enqueueSnackbar(ClientMessages.RECORD_SUCCESFULL_ADDED, {
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
