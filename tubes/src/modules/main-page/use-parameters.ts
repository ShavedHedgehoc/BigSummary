import { UseQueryResult, useQuery } from "@tanstack/react-query";
import ParameterService, { IParameter } from "../../shared/api/services/parameter-service";

export const useParameter = (record_id: number | null): UseQueryResult<IParameter> =>
  useQuery({
    queryKey: ["parameter", record_id],
    queryFn: () => ParameterService.getParametersByRecId(record_id),

    enabled: !!record_id,
  });
