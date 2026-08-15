import { useMutation, useQueryClient } from "@tanstack/react-query";
import HistoryService from "./services/history-service";
import { enqueueSnackbar } from "notistack";
import handleError from "./http/handleError";
import { ClientMessages } from "../resources/client-messages";

export function useDeleteHistory() {
  const client = useQueryClient();
  const { mutate: deleteHistory, isPending: deletePending } = useMutation({
    mutationFn: HistoryService.deleteHistory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["record_histories"] });
      enqueueSnackbar(ClientMessages.HISTORY_SUCCESFULL_DELETED, {
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
  return { deleteHistory, deletePending };
}
