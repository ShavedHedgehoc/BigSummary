import { UseQueryResult, useQuery } from "@tanstack/react-query";
import AuthService, { IAuthResponse } from "../../shared/api/services/auth-service";

export const useAuth = (conveyor_name: string | null): UseQueryResult<IAuthResponse> =>
  useQuery({
    queryKey: ["auth_employee", conveyor_name],
    queryFn: () => AuthService.getAuthEmployee(conveyor_name),
    refetchInterval: 5 * 1000,
    enabled: !!conveyor_name,
  });
