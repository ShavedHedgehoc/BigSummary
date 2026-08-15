import { useMutation, useQueryClient } from "@tanstack/react-query";
import DocumentService from "../../shared/api/services/document-service";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import { ClientMessages } from "../../shared/resources/client-messages";

export function useDeleteDocument() {
  const client = useQueryClient();
  const { mutate: deleteDocument, isPending: deletePending } = useMutation({
    mutationFn: DocumentService.deleteDocument,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["documents_list"] });
      enqueueSnackbar(ClientMessages.DOCUMENT_SUCCESFULL_DELETED, {
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
  return { deleteDocument, deletePending };
}
