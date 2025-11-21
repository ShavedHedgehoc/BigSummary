import handleError from "@/shared/api/http/handle-error";
import ParamsService from "@/shared/api/services/params-service";
import { AppMessages } from "@/shared/resources/app-messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export function useCreateSealantEntry() {
  const client = useQueryClient();

  const { mutate: createSealantEntry, isPending } = useMutation({
    mutationFn: ParamsService.createSealantEntry,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["active_summary"] });
      enqueueSnackbar(AppMessages.RECORD_SUCCESFULL_ADDED, {
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
  return { createSealantEntry, isPending };
}
