import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import AuthService from "../../shared/api/services/auth-service";
import { useAuthStore } from "./store/auth-store";

export function useRegister() {
  const { setAuth, setToken, setUser } = useAuthStore();
  const {
    mutateAsync: register,
    isPending: isRegisterPending,
    data: registerData,
    isSuccess: isRegisterSuccess,
  } = useMutation({
    mutationFn: AuthService.register,
    onSuccess: (data) => {
      setToken(data.data.accessToken);
      setUser(data.data.user);
      setAuth(true);
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
      }
    },
  });
  return { register, registerData, isRegisterPending, isRegisterSuccess };
}
