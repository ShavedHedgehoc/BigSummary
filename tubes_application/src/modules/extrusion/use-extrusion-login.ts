import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useShallow } from "zustand/react/shallow";
import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import EmployeeService from "@/shared/api/services/employee-service";
import handleError from "@/shared/api/http/handle-error";
import { ClientMessages } from "@/shared/resources/client-messages";

export function useLogin() {
  const setEmployee = useExtrusionEmployeeStore(useShallow((state) => state.setExtrusionEmployee));
  const {
    mutateAsync: login,
    isPending: isLoginPending,
    data: loginData,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: EmployeeService.getEmployeeByBarcode,
    onSuccess: (data) => {
      if (data) {
        setEmployee(data);
        enqueueSnackbar(ClientMessages.AUTH_SUCCESSFUL, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else {
        enqueueSnackbar(ClientMessages.EMPLOYEE_NOT_FOUND, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
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
