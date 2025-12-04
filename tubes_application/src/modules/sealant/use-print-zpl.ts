import handleError from "@/shared/api/http/handle-error";
import ZPLService from "@/shared/api/services/zpl-service";
import { AppMessages } from "@/shared/resources/app-messages";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export function usePrintZpl() {
  const { mutate: printZPL, isPending } = useMutation({
    mutationFn: ZPLService.printReceipt,
    onSuccess: () => {
      enqueueSnackbar(AppMessages.PRINT_SUCCESFULL, {
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
  return { printZPL, isPending };
}
