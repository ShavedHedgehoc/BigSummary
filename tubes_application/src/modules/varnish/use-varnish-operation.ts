import { useQuery } from "@tanstack/react-query";
import OperationService from "@/shared/api/services/operation-service";

import { useShallow } from "zustand/shallow";
import { useVarnishOperationSopStore } from "./store/use-varnish-operation-sop-store";

export const useVarnishOperation = (operationId: string | null) => {
  const setSelectedOperation = useVarnishOperationSopStore(useShallow((state) => state.setSelectedOperation));
  const clearSelectedOperation = useVarnishOperationSopStore(useShallow((state) => state.clearSelectedOperation));
  return useQuery({
    queryKey: ["varnish_sop_operation", operationId],
    queryFn: async () => {
      const data = await OperationService.getVarnishOperationById(operationId);
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
