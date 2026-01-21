import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../../shared/resources/client-messages";
import handleError from "../../shared/api/http/handleError";
import TubeRecordsService from "../../shared/api/services/tube-records-service";

export function useDeleteTubeRecord() {
  const client = useQueryClient();

  const { mutate: deleteTubeRecord, isPending: deletePending } = useMutation({
    mutationFn: TubeRecordsService.deleteTubeRecord,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tuberecords_list"] });
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
  return { deleteTubeRecord, deletePending };
}
