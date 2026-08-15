import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";
import RecordService from "../../shared/api/services/record-service";

export function useDeleteRecord() {
  const client = useQueryClient();
  const { mutate: deleteRecord, isPending: deletePending } = useMutation({
    mutationFn: RecordService.deleteRecord,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["document_detail"] });
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
  return { deleteRecord, deletePending };
}
