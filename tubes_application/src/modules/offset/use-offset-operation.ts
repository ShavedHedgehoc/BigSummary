import { useQuery } from "@tanstack/react-query";
import OperationService from "@/shared/api/services/operation-service";

import { useShallow } from "zustand/shallow";
import { useOffsetOperationSopStore } from "./store/use-offset-operation-sop-store";

export const useOffsetOperation = (operationId: string | null) => {
  const setSelectedOperation = useOffsetOperationSopStore(useShallow((state) => state.setSelectedOperation));
  const clearSelectedOperation = useOffsetOperationSopStore(useShallow((state) => state.clearSelectedOperation));
  return useQuery({
    queryKey: ["offset_sop_operation", operationId],
    queryFn: async () => {
      const data = await OperationService.getOffsetOperationById(operationId);
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
