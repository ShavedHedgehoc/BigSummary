import { useMutation, useQueryClient } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../../shared/resources/client-messages";
import handleError from "../../shared/api/http/handleError";
import EmployeeService from "../../services/EmployeeService";

export function useDeleteEmployee() {
  const client = useQueryClient();

  const { mutate: deleteEmployee, isPending: deletePending } = useMutation({
    mutationFn: EmployeeService.deleteEmployee,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["employees"] });
      enqueueSnackbar(ClientMessages.EMPLOYEE_REMOVED, {
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
  return { deleteEmployee, deletePending };
}
