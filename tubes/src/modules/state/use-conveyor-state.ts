import { UseQueryResult, useQuery } from "@tanstack/react-query";
import HistoryService, { LastHistoryResponse } from "../../shared/api/services/history-service";

export const useConveyorState = (conveyorName: string): UseQueryResult<LastHistoryResponse> =>
  useQuery({
    queryKey: ["conveyor_state"],
    queryFn: () => HistoryService.getLastHistoryByConveyorName(conveyorName),
    enabled: !!conveyorName,
    refetchInterval: 1000 * 5,
  });
