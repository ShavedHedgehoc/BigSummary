import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import AuthService from "../../shared/api/services/auth-service";
import { useAuthStore } from "./store/auth-store";
import { useShallow } from "zustand/react/shallow";

export function useCheckAuth() {
  const setAuth = useAuthStore(useShallow((state) => state.setAuth));
  const setToken = useAuthStore(useShallow((state) => state.setToken));
  const setUser = useAuthStore(useShallow((state) => state.setUser));
  const clearToken = useAuthStore(useShallow((state) => state.clearToken));
  const setLastCheckTime = useAuthStore(useShallow((state) => state.setLastCheckTime));

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
      setLastCheckTime(new Date());
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
