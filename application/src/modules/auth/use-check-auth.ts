import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import AuthService from "../../shared/api/services/auth-service";
import { useAuthStore } from "./store/auth-store";

export function useCheckAuth() {
  const { setAuth, setToken, setUser, clearToken } = useAuthStore();
  const {
    mutate: checkAuth,
    isPending: isCheckPending,
    data: checkData,
    isSuccess: isCheckSuccess,
  } = useMutation({
    mutationFn: AuthService.check,
    onSuccess: (data) => {
      setToken(data.data.accessToken);
      setUser(data.data.user);
      setAuth(true);
    },
    onError: (err) => {
      if (err instanceof Error) {
        clearToken();
        setUser(null);
        setAuth(false);
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
      }
    },
  });
  return { checkAuth, isCheckPending, checkData, isCheckSuccess };
}
