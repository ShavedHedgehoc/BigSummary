import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../../../shared/api/http/handleError";
import TubeTresholdsService from "../../../../shared/api/services/tube-tresholds-service";
import { ClientMessages } from "../../../../shared/resources/client-messages";

export function useTubeCreateVarnishTreshold() {
  const client = useQueryClient();

  const { mutate: createVarnishTreshold, isPending } = useMutation({
    mutationFn: TubeTresholdsService.createVarnishTreshold,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tube_extrusion_tresholds"] });
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
  return { createVarnishTreshold, isPending };
}
