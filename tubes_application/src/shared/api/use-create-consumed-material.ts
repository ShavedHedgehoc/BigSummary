import handleError from "@/shared/api/http/handle-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import ConsumedMaterialService from "./services/consumed-material-service";
import { AppMessages } from "../resources/app-messages";

export function useCreateConsumedMaterial() {
  const client = useQueryClient();

  const { mutate: createConsumedMaterial, isPending } = useMutation({
    mutationFn: ConsumedMaterialService.createConsumedMaterial,
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
  return { createConsumedMaterial, isPending };
}
