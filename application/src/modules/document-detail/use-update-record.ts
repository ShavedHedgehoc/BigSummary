import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";
import RecordService from "../../shared/api/services/record-service";

export function useUpdateRecord() {
  const client = useQueryClient();
  const { mutate: updateRecord, isPending: updatePending } = useMutation({
    mutationFn: RecordService.updateRecord,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["document_detail"] });
      enqueueSnackbar(ClientMessages.RECORD_SUCCESFULL_UPDATED, {
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
  return { updateRecord, updatePending };
}
