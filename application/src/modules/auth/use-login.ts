import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import AuthService from "../../shared/api/services/auth-service";
import { useAuthStore } from "./store/auth-store";

export function useLogin() {
  const { setAuth, setToken, setUser } = useAuthStore();
  const {
    mutateAsync: login,
    isPending: isLoginPending,
    data: loginData,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      setToken(data.data.accessToken);
      setUser(data.data.user);
      setAuth(true);
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);

        enqueueSnackbar(Array.isArray(error) ? error.map((item) => item).join(",") : error, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    },
  });
  return { login, isLoginPending, loginData, isLoginSuccess };
}
