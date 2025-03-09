import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";

import AuthService from "../../shared/api/services/auth-service";
import handleError from "../../shared/helpers/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";

export function useLogout(): UseMutateFunction<any, Error, string, unknown> {
  const client = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["auth_employee"] });
      enqueueSnackbar(ClientMessages.EMPLOYEE_EXIT, {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "bottom", horizontal: "right" } });
      }
    },
  });
  return logout;
}
