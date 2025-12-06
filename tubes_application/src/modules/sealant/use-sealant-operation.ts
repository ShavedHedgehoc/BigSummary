import { useQuery } from "@tanstack/react-query";
import OperationService from "@/shared/api/services/operation-service";

import { useShallow } from "zustand/shallow";
import { useSealantOperationSopStore } from "./store/use-sealant-operation-sop-store";

export const useSealantOperation = (operationId: string | null) => {
  const setSelectedOperation = useSealantOperationSopStore(useShallow((state) => state.setSelectedOperation));
  const clearSelectedOperation = useSealantOperationSopStore(useShallow((state) => state.clearSelectedOperation));
  return useQuery({
    queryKey: ["sealant_sop_operation", operationId],
    queryFn: async () => {
      const data = await OperationService.getSealantOperationById(operationId);
      if (data.length > 0) {
        setSelectedOperation(data[0]);
      } else {
        clearSelectedOperation();
      }
      return data;
    },
    enabled: !!operationId,
  });
};
