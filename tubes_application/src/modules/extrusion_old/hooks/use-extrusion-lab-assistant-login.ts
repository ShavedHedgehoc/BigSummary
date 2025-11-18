import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useShallow } from "zustand/react/shallow";
import handleError from "@/shared/api/http/handle-error";
import { ClientMessages } from "@/shared/resources/client-messages";
import { useExtrusionInputQualityParametersModalStore } from "../store/use-extrusion-input-quality-parameters-modal-store";
import LaboratoryAssistantService from "@/shared/api/services/laboratory-assistant-service";
import { useExtrusionLabAssistantStore } from "../store/use-extrusion-lab-assistant-store";

export function useExtrusionLabAssistantLogin() {
  const setOpenInputModal = useExtrusionInputQualityParametersModalStore(useShallow((state) => state.setOpen));
  const setLabAssistaant = useExtrusionLabAssistantStore(useShallow((state) => state.setExtrusionLabAssistant));
  const {
    mutateAsync: login,
    isPending: isLoginPending,
    data: loginData,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: LaboratoryAssistantService.getLaboratoryAssistantByBarcode,
    onSuccess: (data) => {
      if (data) {
        setLabAssistaant(data);
        setOpenInputModal(true);
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
