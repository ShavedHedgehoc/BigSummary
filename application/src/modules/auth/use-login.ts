import { useMutation } from "@tanstack/react-query";

import { enqueueSnackbar } from "notistack";

import AuthService from "../../shared/api/services/auth-service";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";

export function useLogin() {
  const { mutate: processLogin, isPending } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => {
      enqueueSnackbar(ClientMessages.RECORD_SUCCESFULLE_ADDED, {
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
  return { processLogin, isPending };
}
