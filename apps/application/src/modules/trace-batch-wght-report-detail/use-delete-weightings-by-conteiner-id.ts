import { useMutation, useQueryClient } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";

import TraceBatchService from "../../shared/api/services/trace-batchs-service";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";

export function useDeleteWeightingsByContainerId() {
  const client = useQueryClient();
  const { mutate: deleteWeightings, isPending: deletePending } = useMutation({
    mutationFn: TraceBatchService.deleteWeightingsByContainerId,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["wght_report_detail"] });
      enqueueSnackbar(ClientMessages.RECORD_SUCCESFULL_DELETED, {
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
  return { deleteWeightings, deletePending };
}
