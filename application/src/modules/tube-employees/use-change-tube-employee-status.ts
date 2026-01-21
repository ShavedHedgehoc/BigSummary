import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../../shared/resources/client-messages";
import handleError from "../../shared/api/http/handleError";
import TubeEmployeesService from "../../shared/api/services/tube-employees-service";

export function useChangeTubeEmployeeStatus() {
  const client = useQueryClient();

  const { mutate: changeTubeEmployeeStatus, isPending: deletePending } = useMutation({
    mutationFn: TubeEmployeesService.changeBanned,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["tube_employees"] });
      enqueueSnackbar(ClientMessages.EMPLOYEE_UPDATED, {
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
  return { changeTubeEmployeeStatus, deletePending };
}
