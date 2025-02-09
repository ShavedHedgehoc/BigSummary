import { useQuery } from "@tanstack/react-query";
import UserService from "../../shared/api/services/UserService";

export const useUsers = (dto: FetchUsersDto) =>
  useQuery({
    queryKey: ["users", dto],
    queryFn: () => UserService.getUsers(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
