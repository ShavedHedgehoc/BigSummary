import { UseQueryResult, useQuery } from "@tanstack/react-query";
import LineService, { ILine } from "./services/line-service";

export const useLines = (line_description: string | null): UseQueryResult<ILine[]> =>
  useQuery({
    queryKey: ["line"],
    queryFn: () => LineService.getLineByDescription(line_description),
    // enabled: !!line_description,
  });
