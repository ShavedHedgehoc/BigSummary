import handleError from "@/shared/api/http/handle-error";
import ExtrusionService from "@/shared/api/services/extrusion-service";
import { ClientMessages } from "@/shared/resources/client-messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export function useCreateExtrusionEntry() {
  const client = useQueryClient();

  const { mutate: createExtrusionEntry, isPending } = useMutation({
    mutationFn: ExtrusionService.createExtrusionEntry,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["active_summary"] });
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
  return { createExtrusionEntry, isPending };
}
