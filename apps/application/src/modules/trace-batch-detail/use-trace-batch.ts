import { useQuery } from "@tanstack/react-query";
import TraceBatchService from "../../shared/api/services/trace-batchs-service";

export const useTraceBatch = (id: string | undefined) =>
  useQuery({
    queryKey: ["batch", id],
    queryFn: () => TraceBatchService.getTraceBatchById(id),
    enabled: !!id,
  });
