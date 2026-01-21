import { useMutation, useQueryClient } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import handleError from "./http/handleError";
import { ClientMessages } from "../resources/client-messages";
import TubeRecordsService from "./services/tube-records-service";

export function useStartTubeSummary() {
  const client = useQueryClient();

  const { mutate: startTubeSummary, isPending } = useMutation({
    mutationFn: TubeRecordsService.startTubeRecord,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tube_conveyors_data"] });
      client.invalidateQueries({ queryKey: ["tube_available_summaries"] });

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
  return { startTubeSummary, isPending };
}
