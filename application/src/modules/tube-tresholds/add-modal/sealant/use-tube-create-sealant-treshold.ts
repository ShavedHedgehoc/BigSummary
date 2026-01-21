import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../../../../shared/resources/client-messages";
import handleError from "../../../../shared/api/http/handleError";
import TubeTresholdsService from "../../../../shared/api/services/tube-tresholds-service";

export function useTubeCreateSealantTreshold() {
  const client = useQueryClient();

  const { mutate: createSealantTreshold, isPending } = useMutation({
    mutationFn: TubeTresholdsService.createSealantTreshold,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tube_sealant_tresholds"] });
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
  return { createSealantTreshold, isPending };
}
