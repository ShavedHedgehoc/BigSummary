import handleError from "@/shared/api/http/handle-error";
import ProductionBoxService from "@/shared/api/services/production-box-service";
import { AppMessages } from "@/shared/resources/app-messages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export function useCreateProductionBox() {
  const client = useQueryClient();
  const { mutate: createProductionBox, isPending } = useMutation({
    mutationFn: ProductionBoxService.createProductionBox,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["production_boxes"] });
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
  return { createProductionBox, isPending };
}
