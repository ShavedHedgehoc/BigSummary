import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";
import RecordService, { SetActiveRecordDto } from "./services/record-service";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../resources/client-messages";
import handleError from "../helpers/handleError";

interface setActiveRecordResult {
  setActiveRecord: UseMutateFunction<any, Error, SetActiveRecordDto, unknown>;
  setActivePending: boolean;
}

export function useSetActiveRecord(): setActiveRecordResult {
  const client = useQueryClient();
  const { mutate: setActiveRecord, isPending: setActivePending } = useMutation({
    mutationFn: RecordService.setActiveRecord,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["product"] });
      enqueueSnackbar(ClientMessages.PRODUCT_SELECTED, {
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
  return { setActiveRecord, setActivePending };
}
