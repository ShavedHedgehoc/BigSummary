import { useQuery } from "@tanstack/react-query";
import OperationService from "@/shared/api/services/operation-service";
import { useExtrusionOperationSopStore } from "./store/use-extrusion-operation-sop-store";
import { useShallow } from "zustand/shallow";

export const useExtrusionOperation = (operationId: string | null) => {
  const setSelectedOperation = useExtrusionOperationSopStore(useShallow((state) => state.setSelectedOperation));
  const clearSelectedOperation = useExtrusionOperationSopStore(useShallow((state) => state.clearSelectedOperation));
  return useQuery({
    queryKey: ["extrusion_sop_operation", operationId],
    queryFn: async () => {
      const data = await OperationService.getExtrusionOperationById(operationId);
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
