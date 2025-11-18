import handleError from "@/shared/api/http/handle-error";
import SummaryRawMaterialsCurrentService from "@/shared/api/services/summary-raw-materials-current-service";
import { ClientMessages } from "@/shared/resources/client-messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

// Move to common mutations?
export function useCreateMaterialRecord() {
  const client = useQueryClient();

  const { mutate: createMaterialRecord, isPending } = useMutation({
    mutationFn: SummaryRawMaterialsCurrentService.createSummaryRawMaterialsCurrentRecord,
    onSuccess: () => {
      // use summary service invalidate active summary
      client.invalidateQueries({ queryKey: ["raw_materials"] });
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
  return { createMaterialRecord, isPending };
}
