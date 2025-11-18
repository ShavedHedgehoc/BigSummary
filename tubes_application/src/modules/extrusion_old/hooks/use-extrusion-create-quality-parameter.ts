import handleError from "@/shared/api/http/handle-error";
import ExtrusionService from "@/shared/api/services/extrusion-service";
import { ClientMessages } from "@/shared/resources/client-messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export function useExtrusionCreateQualityParameter() {
  const client = useQueryClient();

  const { mutate: createExtrusionQualityParameter, isPending } = useMutation({
    mutationFn: ExtrusionService.createQualityCurrentParamsRecord,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["extrusion_current_params"] });
      client.invalidateQueries({ queryKey: ["extrusion_all_params"] });
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
  return { createExtrusionQualityParameter, isPending };
}
