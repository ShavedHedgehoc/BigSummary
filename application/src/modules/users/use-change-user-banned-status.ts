import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserService from "../../services/UserService";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";

export function useChangeUserStatus() {
  const client = useQueryClient();

  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: UserService.changeBannedStatus,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      enqueueSnackbar("Статус доступа успешно обновлен", {
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
  return { changeStatus, isPending };
}
