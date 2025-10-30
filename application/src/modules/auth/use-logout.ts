import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import AuthService from "../../shared/api/services/auth-service";
import { useAuthStore } from "./store/auth-store";

export function useLogout() {
  const { setAuth, clearToken, setUser } = useAuthStore();
  const { mutateAsync: logout } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      clearToken();
      setUser(null);
      setAuth(false);
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
  return { logout };
}
