import { useMutation, useQueryClient } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "../../shared/resources/client-messages";
import handleError from "../../shared/api/http/handleError";
import EmployeeService from "../../shared/api/services/employee-service";

export function useCreateEmployee() {
  const client = useQueryClient();

  const { mutate: createEmployee, isPending } = useMutation({
    mutationFn: EmployeeService.createEmployee,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["employees"] });
      enqueueSnackbar(ClientMessages.EMPLOYEE_CREATED, {
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
  return { createEmployee, isPending };
}
