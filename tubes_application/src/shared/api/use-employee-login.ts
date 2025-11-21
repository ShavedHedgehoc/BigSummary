import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import EmployeeService, { type IEmployee } from "@/shared/api/services/employee-service";
import handleError from "@/shared/api/http/handle-error";

import { AppMessages } from "../resources/app-messages";

export function useEmployeeLogin(setEmployee: (val: IEmployee) => void) {
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
        enqueueSnackbar(AppMessages.AUTH_SUCCESSFUL, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else {
        enqueueSnackbar(AppMessages.EMPLOYEE_NOT_FOUND, {
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
