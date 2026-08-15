import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";
import UserService from "../../shared/api/services/user-service";
export function useUpdateUserRoles() {
  const client = useQueryClient();
  const { mutate: updateRoles } = useMutation({
    mutationFn: UserService.updateUserRoles,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      enqueueSnackbar(ClientMessages.USER_ROLES_UPDATED, {
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
  return { updateRoles };
}
