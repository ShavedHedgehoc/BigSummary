import { useMutation, useQueryClient } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import handleError from "./http/handleError";
import { ClientMessages } from "../resources/client-messages";
import TubeStatusesService from "./services/tube-statuses-service";

export function useTubeCreateOffsetStatus() {
  const client = useQueryClient();

  const { mutate: createTubeOffsetStatus, isPending } = useMutation({
    mutationFn: TubeStatusesService.createOffsetStatus,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tube_conveyors_data"] });

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
  return { createTubeOffsetStatus, isPending };
}
