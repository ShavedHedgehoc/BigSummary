import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";

import AuthService, { LoginDto } from "../../shared/api/services/auth-service";
import handleError from "../../shared/helpers/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";

export function useLogin(): UseMutateFunction<any, Error, LoginDto, unknown> {
  const client = useQueryClient();
  const { mutate: login } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["auth_employee"] });
      enqueueSnackbar(ClientMessages.EMPLOYEE_IN, {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
      }
    },
  });
  return login;
}
