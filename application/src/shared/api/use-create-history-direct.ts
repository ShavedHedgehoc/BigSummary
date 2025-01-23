import { useMutation, useQueryClient } from "@tanstack/react-query";
import HistoryService from "../../services/HistoryService";
import { enqueueSnackbar } from "notistack";
import handleError from "./http/handleError";
import { ClientMessages } from "../resources/client-messages";

export function useCreateHistoryDirect() {
  const client = useQueryClient();
  const { mutate: addHistory } = useMutation({
    mutationFn: HistoryService.createHistoryDirect,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["current_products"] });
      client.invalidateQueries({ queryKey: ["record_histories"] });
      client.invalidateQueries({ queryKey: ["boils_histories"] });
      client.invalidateQueries({ queryKey: ["boils_list"] });
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
  return addHistory;
}
