import { useQuery } from "@tanstack/react-query";
import TraceBatchService from "../../shared/api/services/trace-batchs-service";

export const useTraceBatchDetail = (id: string | undefined) =>
  useQuery({
    queryKey: ["batch_detail", id],
    queryFn: () => TraceBatchService.getTraceBatchDetailById(id),
    enabled: !!id,
  });
