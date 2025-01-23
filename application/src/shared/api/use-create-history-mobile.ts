import { useMutation, useQueryClient } from "@tanstack/react-query";
import HistoryService from "../../services/HistoryService";
import { enqueueSnackbar } from "notistack";
import handleError from "./http/handleError";
import { ClientMessages } from "../resources/client-messages";

export function useCreateHistoryMobile() {
  const client = useQueryClient();

  const { mutate: addHistory } = useMutation({
    mutationFn: HistoryService.createHistory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["current_products"] });
      client.invalidateQueries({ queryKey: ["record_histories"] });
      client.invalidateQueries({ queryKey: ["boils_histories"] });
      client.invalidateQueries({ queryKey: ["boils_list"] });
      enqueueSnackbar(ClientMessages.RECORD_SUCCESFULL_ADDED, {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "bottom", horizontal: "right" } });
      }
    },
  });
  return addHistory;
}
