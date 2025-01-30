import { useMutation } from "@tanstack/react-query";
import RegulationService from "../../shared/api/services/regulation-service";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../../shared/resources/client-messages";
import handleError from "../../shared/api/http/handleError";

export function useUpdateRegulations() {
  const { mutate: updateRegulations, isPending } = useMutation({
    mutationFn: RegulationService.bulkUpdateRegulations,
    onSuccess: () => {
      enqueueSnackbar(ClientMessages.REGULATIONS_SUCCESFULL_UPDATED, {
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
  return { updateRegulations, isPending };
}
