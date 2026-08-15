import { useQuery } from "@tanstack/react-query";
import TraceCansService from "../../shared/api/services/trace-cans-service";

export const useCansDash = () =>
  useQuery({
    queryKey: ["cans_dash"],
    queryFn: () => TraceCansService.getCans(),

    refetchInterval: 1000 * 10,
  });
